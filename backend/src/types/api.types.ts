export interface ChatRequest {
  caseId: string;
  characterId: string;
  message: string;
  chatHistory: Array<{role: string; content: string}>;
  sessionId?: string;
}

export interface ChatResponse {
  response: string;
  milestoneDiscovered?: string;
  evidenceDiscovered?: string[];
  isConfession?: boolean;
}

export interface CheckWinRequest {
  caseId: string;
  prosecutorResponse: string;
}

export interface CheckWinResponse {
  hasWon: boolean;
  message?: string;
}

export interface MilestoneCheckRequest {
  caseId: string;
  response: string;
  milestoneId: string;
}

export interface MilestoneCheckResponse {
  discovered: boolean;
  milestone?: any;
}