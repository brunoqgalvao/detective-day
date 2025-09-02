import { v4 as uuidv4 } from 'uuid';
import { GameState } from '../types/case.types';

interface GameSession {
  gameId: string;
  sessionId: string;
  caseId: string;
  startedAt: Date;
  lastActivity: Date;
  state: GameState;
}

class SessionService {
  private sessions: Map<string, GameSession> = new Map();
  private sessionsByGameId: Map<string, string> = new Map(); // gameId -> sessionId

  createGameSession(sessionId: string, caseId: string): string {
    // Generate unique game ID
    const gameId = `game_${Date.now()}_${uuidv4().substring(0, 8)}`;
    
    const session: GameSession = {
      gameId,
      sessionId,
      caseId,
      startedAt: new Date(),
      lastActivity: new Date(),
      state: {
        caseId,
        chatHistories: {},
        evidenceDiscovered: [],
        milestonesDiscovered: [],
        notes: '',
        gameWon: false
      }
    };

    this.sessions.set(sessionId, session);
    this.sessionsByGameId.set(gameId, sessionId);
    
    console.log(`[SESSION] Created new game session - GameID: ${gameId}, SessionID: ${sessionId}`);
    return gameId;
  }

  getSession(sessionId: string): GameSession | undefined {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.lastActivity = new Date();
    }
    return session;
  }

  getSessionByGameId(gameId: string): GameSession | undefined {
    const sessionId = this.sessionsByGameId.get(gameId);
    if (sessionId) {
      return this.getSession(sessionId);
    }
    return undefined;
  }

  updateSessionState(sessionId: string, state: Partial<GameState>): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.state = { ...session.state, ...state };
      session.lastActivity = new Date();
    }
  }

  getGameId(sessionId: string): string | undefined {
    return this.sessions.get(sessionId)?.gameId;
  }

  getAllSessions(): GameSession[] {
    return Array.from(this.sessions.values());
  }

  cleanupOldSessions(maxAgeHours: number = 24): void {
    const now = new Date();
    const maxAgeMs = maxAgeHours * 60 * 60 * 1000;

    for (const [sessionId, session] of this.sessions.entries()) {
      const age = now.getTime() - session.lastActivity.getTime();
      if (age > maxAgeMs) {
        this.sessionsByGameId.delete(session.gameId);
        this.sessions.delete(sessionId);
        console.log(`[SESSION] Cleaned up old session - GameID: ${session.gameId}`);
      }
    }
  }
}

export default new SessionService();