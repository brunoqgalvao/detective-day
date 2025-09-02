export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  publicInfo: string;
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
  category: string;
  importance: string;
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
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GameState {
  caseId: string;
  chatHistories: Record<string, ChatMessage[]>;
  evidenceDiscovered: string[];
  milestonesDiscovered: string[];
  notes: string;
  gameWon: boolean;
  currentCharacter: string | null;
  gameStartTime?: string;
  investigationStartTime?: string;
}