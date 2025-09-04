import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CaseData, Character } from '../types/case.types';

export class CaseService {
  private cases: Map<string, CaseData> = new Map();
  private caseModules: Map<string, any> = new Map();

  constructor() {
    this.loadCases();
  }

  private loadCases() {
    const caseIds = ['westwood', 'cyber-heist', 'art-forgery'];
    
    for (const caseId of caseIds) {
      try {
        // Load case JSON
        const casePath = join(__dirname, `../cases/${caseId}/case.json`);
        if (!existsSync(casePath)) {
          console.warn(`Case file not found: ${casePath}`);
          continue;
        }
        
        const caseData = JSON.parse(readFileSync(casePath, 'utf-8'));
        
        // Load case-specific modules
        const modules: any = {};
        
        // Try to load character data
        try {
          const characterModule = require(`../cases/${caseId}/characters`);
          modules.characterPrivateData = characterModule.characterPrivateData;
          modules.solution = characterModule.solution;
        } catch (e) {
          console.warn(`No character data for ${caseId}`);
        }
        
        // Try to load milestones
        try {
          const milestonesModule = require(`../cases/${caseId}/milestones`);
          modules.milestones = milestonesModule.milestones;
        } catch (e) {
          console.warn(`No milestones for ${caseId}`);
        }
        
        // Try to load facts
        try {
          const factsModule = require(`../cases/${caseId}/facts`);
          modules.facts = factsModule.facts;
          modules.publicFacts = factsModule.publicFacts;
        } catch (e) {
          console.warn(`No facts for ${caseId}`);
        }
        
        // Try to load timelines
        try {
          const timelinesModule = require(`../cases/${caseId}/timelines`);
          modules.timelines = timelinesModule.timelines || timelinesModule.timeline;
        } catch (e) {
          console.warn(`No timelines for ${caseId}`);
        }
        
        this.caseModules.set(caseId, modules);
        
        // Merge with private data
        const fullCase: CaseData = {
          ...caseData,
          milestones: modules.milestones || {},
          solution: modules.solution || caseData.solution,
          // Add private character data (kept on backend only)
          characters: caseData.characters.map((char: Character) => ({
            ...char,
            privateInfo: modules.characterPrivateData?.[char.id]
          }))
        };
        
        this.cases.set(caseId, fullCase);
        console.log(`Loaded case: ${caseId}`);
      } catch (error) {
        console.error(`Failed to load case ${caseId}:`, error);
      }
    }
  }

  getCase(caseId: string): CaseData | undefined {
    return this.cases.get(caseId);
  }

  getCaseForFrontend(caseId: string): Partial<CaseData> | undefined {
    const caseData = this.cases.get(caseId);
    if (!caseData) return undefined;

    // Remove sensitive data before sending to frontend
    const { solution, ...publicData } = caseData;
    
    return {
      ...publicData,
      characters: publicData.characters.map(char => {
        const { privateInfo, ...publicChar } = char;
        return publicChar;
      })
    };
  }

  getAllCases(): Array<{ id: string; title: string; description: string }> {
    return Array.from(this.cases.values()).map(caseData => ({
      id: caseData.id,
      title: caseData.title,
      description: caseData.victim?.description || caseData.initialBriefing?.substring(0, 200) || ''
    }));
  }

  getCharacterPrompt(caseId: string, characterId: string): string | undefined {
    const caseData = this.cases.get(caseId);
    if (!caseData) return undefined;

    const character = caseData.characters.find(c => c.id === characterId);
    if (!character || !character.privateInfo) return undefined;

    return this.generateCharacterPrompt(character, caseId);
  }

  private generateCharacterPrompt(character: Character, caseId: string): string {
    const info = character.privateInfo!;
    const modules = this.caseModules.get(caseId);
    const characterFacts = modules?.facts?.[character.id] || [];
    const characterTimeline = modules?.timelines?.[character.id];
    
    // Handle different case types
    const caseName = this.getCaseName(caseId);
    
    return `You are ${character.name}, ${character.age} years old, ${character.role} in the ${caseName} case.

YOUR BACKGROUND:
${character.publicInfo}

YOUR RELATIONSHIP/CONTEXT:
${info.relationship}

YOUR TIMELINE FOR THE INCIDENT:
${characterTimeline?.timeline || info.alibi || 'Not specified'}

YOUR OBSERVATIONS AND MEMORIES:
${characterTimeline?.observations || 'Not specified'}

YOUR ALIBI:
${info.alibi}

YOUR SECRETS (DO NOT REVEAL UNLESS PRESSED):
${info.secrets}

YOUR MOTIVE (NEVER ADMIT DIRECTLY):
${info.motive}

FACTS YOU KNOW (ONLY reference these facts - do not invent new details):
${characterFacts.join('\n')}

LIES TO MAINTAIN (until confronted with evidence):
${info.lies?.map((l: string) => `- ${l}`).join('\n') || 'None'}

PERSONALITY:
${info.personality}

CRITICAL INTERACTION RULES:
1. You are a SUSPECT being interviewed, NOT an assistant or helper
2. NEVER suggest what the detective should ask next
3. Answer what was asked, but you MAY subtly redirect if it serves your character's goals
4. You can be evasive, defensive, or emotional - you're under suspicion
5. Stay in character - you're stressed, possibly guilty, and being interrogated
6. Format your responses with actions/narration in *asterisks* and dialogue as plain text

${this.getConfessionTrigger(caseId, character.id)}`;
  }
  
  private getCaseName(caseId: string): string {
    switch(caseId) {
      case 'westwood': return 'Westwood Manor murder';
      case 'cyber-heist': return 'SecureBank cyber heist';
      case 'art-forgery': return 'Monet Gallery murder';
      default: return 'investigation';
    }
  }
  
  
  private getConfessionTrigger(caseId: string, characterId: string): string {
    const modules = this.caseModules.get(caseId);
    const solution = modules?.solution;
    
    if (solution && solution.culprit === characterId) {
      switch(caseId) {
        case 'westwood':
          return 'If confronted with chemistry book, gambling debts, AND lack of alibi together, break down and confess.';
        case 'cyber-heist':
          return 'If confronted with keylogger evidence and proof of VPN spoofing, break down about crypto losses and confess.';
        case 'art-forgery':
          return 'If shown security footage and fingerprint evidence on poison bottle, admit you couldn\'t let Vincent destroy your reputation.';
        default:
          return 'If confronted with overwhelming evidence, consider confessing.';
      }
    }
    
    return 'Always maintain innocence.';
  }

  getForensicsPrompt(caseId: string = 'westwood'): string {
    switch(caseId) {
      case 'cyber-heist':
        return this.getCyberForensicsPrompt();
      case 'art-forgery':
        return this.getArtForensicsPrompt();
      default:
        return this.getWestwoodForensicsPrompt();
    }
  }
  
  private getWestwoodForensicsPrompt(): string {
    return `You are Dr. Sarah Mitchell, a forensic expert working on the Westwood Manor murder case.

CRITICAL: You must ONLY reference these established facts and evidence. DO NOT invent new details, characters, or evidence.

CONFIRMED FORENSIC FINDINGS:
- Victor Westwood died from cyanide poisoning between 10:00-10:30 PM
- The poison was in his whiskey glass (half-consumed)
- Only Victor's fingerprints were found on the glass
- No signs of struggle in the study
- The study window was slightly ajar
- The study door was locked from inside
- Cyanide acts quickly (5-15 minutes after ingestion)
- A small bottle with cyanide residue was found in the greenhouse (fingerprints too smudged to identify)

IMPORTANT RULES:
1. NEVER invent new evidence or test results
2. If asked about something not listed above, say you haven't analyzed it yet
3. Be scientific but stick to the established facts
4. Format your responses with actions/narration in *asterisks* and dialogue as plain text`;
  }
  
  private getCyberForensicsPrompt(): string {
    return `You are Dr. Alex Thompson, a cyber forensics expert working on the SecureBank heist case.

CONFIRMED DIGITAL FINDINGS:
- $50 million transferred at exactly 2:47 AM
- Attack originated from inside the network
- Legitimate credentials were used (sold by David Morrison)
- VPN logs show connections but can be spoofed
- Fake server alert triggered at 2:15 AM
- Keylogger found on David Morrison's machine
- Cryptocurrency dispersed to multiple wallets
- No alarms triggered during the heist

TECHNICAL EVIDENCE:
- Backdoor access points discovered (created by Alex Chen)
- VPN spoofing software traces found
- Alert system was compromised remotely
- Blockchain analysis shows untraceable transactions

IMPORTANT RULES:
1. Only reference confirmed digital evidence
2. Be technical but clear
3. Don't invent new findings
4. Format responses with *actions* and plain dialogue`;
  }
  
  private getArtForensicsPrompt(): string {
    return `You are Dr. Lisa Chen, a forensic expert working on the Monet Gallery murder case.

CONFIRMED FORENSIC FINDINGS:
- Vincent Monet died from toxic paint thinner poisoning around 8:45-9:00 PM
- Poison was mixed in red wine
- Paint thinner bottle found with partial fingerprints
- No signs of struggle
- Gallery alarm was disabled manually
- Back door unlocked with a key
- Strong paint thinner smell throughout gallery
- Security footage shows several people entering/leaving

CHEMICAL ANALYSIS:
- Paint thinner contained lethal concentration of methanol
- Would cause death within 15-30 minutes
- Victim showed signs of methanol poisoning

IMPORTANT RULES:
1. Only reference confirmed evidence
2. Be scientific and precise
3. Don't invent findings
4. Format responses with *actions* and plain dialogue`;
  }

  getProsecutorPrompt(caseId: string = 'westwood'): string {
    const modules = this.caseModules.get(caseId);
    const solution = modules?.solution;
    
    switch(caseId) {
      case 'cyber-heist':
        return `You are District Attorney Patricia Hayes. You need solid evidence to prosecute someone for the SecureBank cyber heist.
        
You need:
1. Digital evidence linking suspect to crime
2. Motive (financial pressure)
3. Technical capability
4. Opportunity and access

${solution ? `If the detective presents strong evidence against ${solution.culprit} (keylogger evidence, VPN spoofing, crypto connection), agree to prosecute.` : ''}

Be skeptical but fair. Format responses with *actions* and dialogue.`;
        
      case 'art-forgery':
        return `You are District Attorney Patricia Hayes. You need solid evidence to prosecute someone for Vincent Monet's murder.
        
You need:
1. Physical evidence (fingerprints, poison)
2. Motive
3. Opportunity
4. Means (access to gallery and poison)

${solution ? `If the detective presents strong evidence against ${solution.culprit} (fingerprints on poison, security footage, motive), agree to prosecute.` : ''}

Be skeptical but fair. Format responses with *actions* and dialogue.`;
        
      default:
        return this.getDefaultProsecutorPrompt();
    }
  }
  
  private getDefaultProsecutorPrompt(): string {
    return `You are District Attorney Patricia Hayes. You need solid evidence to prosecute someone for Victor Westwood's murder. 

You know the basic facts of the case and will evaluate if the detective has enough evidence to prosecute. You need:
1. Clear motive
2. Opportunity (access and timing)
3. Means (access to poison)
4. Evidence linking suspect to crime

Be skeptical but fair. Ask for specific evidence. If the detective presents a strong case with evidence against Marcus Westwood (chemistry knowledge, gambling debts, the chemistry book, no alibi), you'll agree to prosecute.

If they accuse anyone else, point out weaknesses in their case. Only accept prosecution if evidence is overwhelming.

Format your responses with actions/narration in *asterisks* and dialogue as plain text`;
  }

  checkWinCondition(prosecutorResponse: string, caseId: string = 'westwood'): boolean {
    const winPhrases = [
      'enough evidence',
      'press charges',
      'prosecute',
      'arrest',
      'strong case',
      'convince',
      'proceed with charges',
      'file charges'
    ];
    
    const response = prosecutorResponse.toLowerCase();
    const hasWinPhrase = winPhrases.some(phrase => response.includes(phrase));
    
    const modules = this.caseModules.get(caseId);
    const solution = modules?.solution;
    
    if (solution && solution.culprit) {
      // Check if the correct suspect is mentioned
      const culpritName = this.getCulpritName(caseId, solution.culprit);
      return hasWinPhrase && response.includes(culpritName.toLowerCase());
    }
    
    return hasWinPhrase;
  }
  
  private getCulpritName(caseId: string, culpritId: string): string {
    const caseData = this.cases.get(caseId);
    const character = caseData?.characters.find(c => c.id === culpritId);
    return character?.name?.split(' ')[0] || culpritId;
  }
}

export default new CaseService();