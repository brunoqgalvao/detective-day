import { Router } from 'express';
import caseController from '../controllers/case.controller';
import chatController from '../controllers/chat.controller';
import gameController from '../controllers/game.controller';

const router = Router();

// Case routes
router.get('/cases', caseController.getAllCases);
router.get('/cases/:id', caseController.getCase);
router.get('/cases/:id/evidence', caseController.getCaseEvidence);
router.get('/cases/:id/milestones', caseController.getCaseMilestones);

// Chat routes
router.post('/chat', chatController.handleChat);
router.post('/chat/check-cheat', chatController.checkForCheating);

// Game state routes
router.get('/game/:sessionId', gameController.getGameState);
router.post('/game/:sessionId', gameController.saveGameState);
router.delete('/game/:sessionId', gameController.resetGame);
router.post('/game/check-win', gameController.checkWinCondition);
router.get('/game/:sessionId/logs', gameController.getGameLogs);

export default router;