import { Request, Response } from 'express';
import { GameState } from '../types/case.types';
import sessionService from '../services/session.service';
import loggingService from '../services/logging.service';

// In-memory game state storage (in production, use Redis or a database)
const gameStates = new Map<string, GameState>();

export class GameController {
  saveGameState(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const gameState: GameState = req.body;
      
      gameStates.set(sessionId, gameState);
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving game state:', error);
      res.status(500).json({ error: 'Failed to save game state' });
    }
  }

  getGameState(req: Request<{ sessionId: string }>, res: Response): void {
    try {
      const { sessionId } = req.params;
      const gameState = gameStates.get(sessionId);
      
      if (!gameState) {
        res.json(null);
        return;
      }
      
      res.json(gameState);
    } catch (error) {
      console.error('Error getting game state:', error);
      res.status(500).json({ error: 'Failed to get game state' });
    }
  }

  resetGame(req: Request<{ sessionId: string }>, res: Response) {
    try {
      const { sessionId } = req.params;
      gameStates.delete(sessionId);
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error resetting game:', error);
      res.status(500).json({ error: 'Failed to reset game' });
    }
  }

  checkWinCondition(req: Request, res: Response) {
    try {
      const { prosecutorResponse } = req.body;
      
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
      
      const hasWon = hasWinPhrase && mentionsMarcus;
      
      res.json({ 
        hasWon,
        message: hasWon 
          ? "The District Attorney has agreed to prosecute! You've solved the case!"
          : "The District Attorney needs more evidence to proceed."
      });
    } catch (error) {
      console.error('Error checking win condition:', error);
      res.status(500).json({ error: 'Failed to check win condition' });
    }
  }

  getGameLogs(req: Request<{ sessionId: string }>, res: Response) {
    try {
      const { sessionId } = req.params;
      const gameId = sessionService.getGameId(sessionId);
      
      if (!gameId) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      
      const logs = loggingService.getGameLogs(gameId);
      const summary = loggingService.generateGameSummary(gameId);
      
      res.json({ 
        gameId,
        sessionId,
        summary,
        logs 
      });
    } catch (error) {
      console.error('Error getting game logs:', error);
      res.status(500).json({ error: 'Failed to get game logs' });
    }
  }
}

export default new GameController();