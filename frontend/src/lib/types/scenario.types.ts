export interface GameScenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  thumbnailType?: 'emoji' | 'image';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: string;
  tags: string[];
  isLocked: boolean;
  isPremium: boolean;
  price?: number;
  unlockCondition?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    atmosphere: 'noir' | 'mystery' | 'thriller' | 'puzzle' | 'adventure';
  };
  gameConfig: {
    timeLimit?: number;
    maxQuestions: number;
    startingEvidence: string[];
    winConditions: {
      requiredSolution: string;
      requiredEvidence?: string[];
    };
  };
  content: {
    briefing: string;
    initialScene: string;
    characters: Character[];
    locations: Location[];
    evidence: Evidence[];
    dialogues: Dialogue[];
  };
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  isGuilty: boolean;
  secrets: string[];
}

export interface Location {
  id: string;
  name: string;
  description: string;
  availableEvidence: string[];
  charactersPresent: string[];
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'photo' | 'item' | 'testimony';
  imageUrl?: string;
  reveals: string[];
  isKeyEvidence: boolean;
}

export interface Dialogue {
  characterId: string;
  conditions?: {
    requiredEvidence?: string[];
    requiredQuestions?: string[];
  };
  responses: {
    [question: string]: string;
  };
}

export interface ScenarioProgress {
  scenarioId: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  questionsUsed?: number;
  timeSpent?: number;
  unlockedEvidence: string[];
  notes: string;
}