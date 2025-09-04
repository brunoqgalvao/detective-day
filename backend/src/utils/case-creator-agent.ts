/**
 * Case Creation and Improvement Agent
 * This agent helps create high-quality detective cases with proper complexity,
 * red herrings, and logical solutions.
 */

export interface CaseQualityMetrics {
  complexity: number; // 1-10
  redHerrings: number; // Count of false leads
  characterDepth: number; // 1-10
  clueIntegration: number; // 1-10
  narrativeCoherence: number; // 1-10
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface CaseRequirements {
  // Core Mystery Elements
  victim: {
    name: string;
    background: string;
    relationships: string[];
    secretsAboutOthers: string[];
  };
  
  // Crime Details
  crime: {
    type: 'murder' | 'theft' | 'disappearance' | 'fraud' | 'sabotage';
    method: string;
    time: string;
    location: string;
    weapon?: string;
    evidenceLeft: string[];
  };
  
  // Characters (6-8 recommended)
  suspects: Array<{
    name: string;
    role: string;
    alibi: string;
    motive: string;
    means: boolean; // Access to method
    opportunity: boolean; // Could have done it
    secrets: string[];
    personality: string;
    lies: string[];
    truths: string[];
    redHerring?: boolean; // Is this a false lead?
  }>;
  
  // Evidence System
  evidence: {
    physical: string[]; // Fingerprints, DNA, objects
    documentary: string[]; // Letters, contracts, emails
    testimonial: string[]; // What witnesses saw
    forensic: string[]; // Scientific evidence
    digital?: string[]; // For modern cases
  };
  
  // Timeline
  timeline: Array<{
    time: string;
    event: string;
    witnesses: string[];
    importance: 'critical' | 'important' | 'minor';
  }>;
  
  // Solution
  solution: {
    culprit: string;
    method: string;
    motive: string;
    keyEvidence: string[];
    breakingPoint: string; // What makes them confess
    redHerringsExplained: Record<string, string>; // Explain false leads
  };
}

export class CaseCreatorAgent {
  
  /**
   * Evaluates case quality and provides improvement suggestions
   */
  static evaluateCase(caseData: Partial<CaseRequirements>): {
    metrics: CaseQualityMetrics;
    strengths: string[];
    improvements: string[];
    missingElements: string[];
  } {
    const metrics: CaseQualityMetrics = {
      complexity: 0,
      redHerrings: 0,
      characterDepth: 0,
      clueIntegration: 0,
      narrativeCoherence: 0,
      difficulty: 'medium'
    };
    
    const strengths: string[] = [];
    const improvements: string[] = [];
    const missingElements: string[] = [];
    
    // Check for essential elements
    if (!caseData.victim) missingElements.push('Victim details missing');
    if (!caseData.crime) missingElements.push('Crime details missing');
    if (!caseData.suspects || caseData.suspects.length < 4) {
      missingElements.push('Need at least 4-6 suspects for good complexity');
    }
    if (!caseData.solution) missingElements.push('Solution missing');
    
    // Evaluate complexity
    if (caseData.suspects) {
      metrics.complexity = Math.min(10, caseData.suspects.length * 1.5);
      if (caseData.suspects.length >= 6) strengths.push('Good number of suspects');
      
      // Count red herrings
      metrics.redHerrings = caseData.suspects.filter(s => s.redHerring).length;
      if (metrics.redHerrings < 2) {
        improvements.push('Add more red herrings (false leads) to increase complexity');
      }
      
      // Evaluate character depth
      const avgSecrets = caseData.suspects.reduce((sum, s) => sum + (s.secrets?.length || 0), 0) / caseData.suspects.length;
      metrics.characterDepth = Math.min(10, avgSecrets * 2);
      if (avgSecrets < 3) {
        improvements.push('Give each character more secrets and hidden motivations');
      }
    }
    
    // Evaluate evidence integration
    if (caseData.evidence) {
      const totalEvidence = Object.values(caseData.evidence).flat().length;
      metrics.clueIntegration = Math.min(10, totalEvidence / 3);
      if (totalEvidence < 15) {
        improvements.push('Add more diverse evidence types');
      }
      if (!caseData.evidence.forensic || caseData.evidence.forensic.length === 0) {
        improvements.push('Add forensic evidence for more scientific approach');
      }
    }
    
    // Evaluate narrative coherence
    if (caseData.timeline && caseData.solution) {
      metrics.narrativeCoherence = 7; // Base score
      if (caseData.timeline.length >= 10) metrics.narrativeCoherence += 2;
      if (caseData.solution.redHerringsExplained) metrics.narrativeCoherence += 1;
      
      if (!caseData.solution.redHerringsExplained) {
        improvements.push('Explain all red herrings in the solution');
      }
    }
    
    // Determine difficulty
    const avgScore = (metrics.complexity + metrics.characterDepth + metrics.clueIntegration) / 3;
    if (avgScore < 3) metrics.difficulty = 'easy';
    else if (avgScore < 5) metrics.difficulty = 'medium';
    else if (avgScore < 7) metrics.difficulty = 'hard';
    else metrics.difficulty = 'expert';
    
    return { metrics, strengths, improvements, missingElements };
  }
  
  /**
   * Essential elements every good case needs
   */
  static getEssentialElements(): string[] {
    return [
      '✓ Clear victim with complex relationships',
      '✓ 5-8 suspects with varied motives',
      '✓ At least 2-3 red herrings (false leads)',
      '✓ Timeline with overlapping alibis',
      '✓ Mix of physical, documentary, and testimonial evidence',
      '✓ Each suspect has secrets unrelated to the crime',
      '✓ Multiple suspects with means and opportunity',
      '✓ Logical solution that ties all evidence together',
      '✓ Breaking point that triggers confession',
      '✓ All red herrings explained in solution'
    ];
  }
  
  /**
   * Common pitfalls to avoid
   */
  static getPitfalls(): string[] {
    return [
      '✗ Making the culprit too obvious',
      '✗ Having only one suspect with real motive',
      '✗ Evidence that directly points to culprit',
      '✗ Alibis that are too solid or too weak',
      '✗ Forgetting to give innocent suspects secrets',
      '✗ Making the solution require outside knowledge',
      '✗ Timeline contradictions',
      '✗ Unexplained red herrings',
      '✗ Characters without depth or personality',
      '✗ Missing the emotional element of the crime'
    ];
  }
  
  /**
   * Generate character interconnections
   */
  static generateInterconnections(suspects: string[]): Record<string, string[]> {
    const connections: Record<string, string[]> = {};
    
    // Each character should know at least 2-3 others
    suspects.forEach(suspect => {
      connections[suspect] = [];
      const numConnections = 2 + Math.floor(Math.random() * 3);
      const others = suspects.filter(s => s !== suspect);
      
      for (let i = 0; i < Math.min(numConnections, others.length); i++) {
        const randomOther = others[Math.floor(Math.random() * others.length)];
        if (!connections[suspect].includes(randomOther)) {
          connections[suspect].push(randomOther);
        }
      }
    });
    
    return connections;
  }
  
  /**
   * Template for creating a new case
   */
  static getCaseTemplate(): CaseRequirements {
    return {
      victim: {
        name: '',
        background: '',
        relationships: [],
        secretsAboutOthers: []
      },
      crime: {
        type: 'murder',
        method: '',
        time: '',
        location: '',
        evidenceLeft: []
      },
      suspects: [],
      evidence: {
        physical: [],
        documentary: [],
        testimonial: [],
        forensic: []
      },
      timeline: [],
      solution: {
        culprit: '',
        method: '',
        motive: '',
        keyEvidence: [],
        breakingPoint: '',
        redHerringsExplained: {}
      }
    };
  }
}

/**
 * Feedback generator for case improvement
 */
export function generateCaseFeedback(caseData: Partial<CaseRequirements>): string {
  const evaluation = CaseCreatorAgent.evaluateCase(caseData);
  
  let feedback = '# Case Quality Report\n\n';
  
  feedback += '## Metrics\n';
  feedback += `- Complexity: ${evaluation.metrics.complexity}/10\n`;
  feedback += `- Red Herrings: ${evaluation.metrics.redHerrings}\n`;
  feedback += `- Character Depth: ${evaluation.metrics.characterDepth}/10\n`;
  feedback += `- Clue Integration: ${evaluation.metrics.clueIntegration}/10\n`;
  feedback += `- Narrative Coherence: ${evaluation.metrics.narrativeCoherence}/10\n`;
  feedback += `- Difficulty: ${evaluation.metrics.difficulty}\n\n`;
  
  if (evaluation.missingElements.length > 0) {
    feedback += '## Missing Elements\n';
    evaluation.missingElements.forEach(element => {
      feedback += `- ${element}\n`;
    });
    feedback += '\n';
  }
  
  if (evaluation.strengths.length > 0) {
    feedback += '## Strengths\n';
    evaluation.strengths.forEach(strength => {
      feedback += `- ${strength}\n`;
    });
    feedback += '\n';
  }
  
  if (evaluation.improvements.length > 0) {
    feedback += '## Suggested Improvements\n';
    evaluation.improvements.forEach(improvement => {
      feedback += `- ${improvement}\n`;
    });
    feedback += '\n';
  }
  
  feedback += '## Essential Elements Checklist\n';
  CaseCreatorAgent.getEssentialElements().forEach(element => {
    feedback += `${element}\n`;
  });
  
  return feedback;
}