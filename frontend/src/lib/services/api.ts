import type { GameState, CaseData, ChatMessage } from '../types/game.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010/api';

class ApiService {
  private async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  // Case endpoints
  async getAllCases() {
    return this.fetch<Array<{ id: string; title: string; description: string }>>('/cases');
  }

  async getCase(caseId: string) {
    return this.fetch<CaseData>(`/cases/${caseId}`);
  }

  // Chat endpoints
  async sendChatMessage(
    caseId: string,
    characterId: string,
    message: string,
    chatHistory: ChatMessage[],
    sessionId: string
  ) {
    return this.fetch<{
      response: string;
      milestoneDiscovered?: string;
      evidenceDiscovered?: string[];
      isConfession?: boolean;
    }>('/chat', {
      method: 'POST',
      body: JSON.stringify({
        caseId,
        characterId,
        message,
        chatHistory,
        sessionId,
      }),
    });
  }

  async checkForCheating(message: string) {
    return this.fetch<{ isCheating: boolean }>('/chat/check-cheat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Game state endpoints
  async getGameState(sessionId: string) {
    return this.fetch<GameState | null>(`/game/${sessionId}`);
  }

  async saveGameState(sessionId: string, gameState: GameState) {
    return this.fetch<{ success: boolean }>(`/game/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify(gameState),
    });
  }

  async resetGame(sessionId: string) {
    return this.fetch<{ success: boolean }>(`/game/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async checkWinCondition(prosecutorResponse: string) {
    return this.fetch<{ hasWon: boolean; message?: string }>('/game/check-win', {
      method: 'POST',
      body: JSON.stringify({ prosecutorResponse }),
    });
  }
}

export const api = new ApiService();