import { readFileSync } from 'fs';
import { join } from 'path';
import { CaseData, Character } from '../types/case.types';

// Import character private data and prompts
import { characterPrivateData } from '../cases/westwood/characters';
import { milestones } from '../cases/westwood/milestones';
import { facts } from '../cases/westwood/facts';
import { timelines } from '../cases/westwood/timelines';

export class CaseService {
  private cases: Map<string, CaseData> = new Map();

  constructor() {
    this.loadCases();
  }

  private loadCases() {
    // Load Westwood case
    const westwoodPath = join(__dirname, '../cases/westwood/case.json');
    const westwoodData = JSON.parse(readFileSync(westwoodPath, 'utf-8'));
    
    // Merge with private data
    const fullCase: CaseData = {
      ...westwoodData,
      milestones,
      // Add private character data (kept on backend only)
      characters: westwoodData.characters.map((char: Character) => ({
        ...char,
        privateInfo: characterPrivateData[char.id]
      }))
    };

    this.cases.set('westwood', fullCase);
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
      description: caseData.victim.description
    }));
  }

  getCharacterPrompt(caseId: string, characterId: string): string | undefined {
    const caseData = this.cases.get(caseId);
    if (!caseData) return undefined;

    const character = caseData.characters.find(c => c.id === characterId);
    if (!character || !character.privateInfo) return undefined;

    return this.generateCharacterPrompt(character, caseId);
  }

  private generateCharacterPrompt(character: Character, _caseId: string): string {
    const info = character.privateInfo!;
    const characterFacts = facts[character.id] || [];
    const characterTimeline = timelines[character.id];
    
    return `You are ${character.name}, ${character.age} years old, ${character.role} in the Westwood Manor murder case.

YOUR BACKGROUND:
${character.publicInfo}

YOUR RELATIONSHIP WITH VICTOR:
${info.relationship}

YOUR TIMELINE FOR THE EVENING:
${characterTimeline?.timeline || 'Not specified'}

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
${info.lies.map(l => `- ${l}`).join('\n')}

PERSONALITY:
${info.personality}

CRITICAL INTERACTION RULES:
1. You are a SUSPECT being interviewed, NOT an assistant or helper
2. NEVER suggest what the detective should ask next
3. Answer what was asked, but you MAY subtly redirect if it serves your character's goals
4. You can be evasive, defensive, or emotional - you're under suspicion
5. Stay in character - you're stressed, possibly guilty, and being interrogated
6. Format your responses with actions/narration in *asterisks* and dialogue as plain text

${character.id === 'marcus' ? 
  'If confronted with chemistry book, gambling debts, AND lack of alibi together, break down and confess.' : 
  'Always maintain innocence.'}`;
  }

  getForensicsPrompt(): string {
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

  getProsecutorPrompt(): string {
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

  checkWinCondition(prosecutorResponse: string): boolean {
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
    const mentionsMarcus = response.includes('marcus');
    
    return hasWinPhrase && mentionsMarcus;
  }
}

export default new CaseService();