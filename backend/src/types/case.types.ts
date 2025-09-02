export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  publicInfo: string;
  // These are hidden from frontend
  privateInfo?: {
    alibi: string;
    motive: string;
    secrets: string;
    relationship: string;
    truthfulFacts: string[];
    lies: string[];
    personality: string;
  };
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  discovered: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'alibi' | 'motive' | 'means' | 'forensic' | 'scene' | 'behavior';
  character: string;
  keywords: string[];
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface CaseData {
  id: string;
  title: string;
  initialBriefing: string;
  victim: {
    name: string;
    age: number;
    occupation: string;
    description: string;
    timeOfDeath: string;
    causeOfDeath: string;
  };
  characters: Character[];
  evidence: Evidence[];
  milestones: Record<string, Milestone>;
  // Hidden from frontend
  solution?: {
    murderer: string;
    method: string;
    motive: string;
    keyEvidence: string[];
    confession: string;
  };
}

export interface Fact {
  id: string;
  fact: string;
  knownBy: string[];
}

export interface CharacterTimeline {
  timeline: Record<string, string>;
  observations: Record<string, string>;
  knowledgeGaps?: string[];
}

export interface GameState {
  caseId: string;
  chatHistories: Record<string, Array<{role: string; content: string}>>;
  evidenceDiscovered: string[];
  milestonesDiscovered: string[];
  notes: string;
  gameWon: boolean;
}