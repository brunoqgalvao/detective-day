import { Request, Response } from 'express';
import caseService from '../services/case.service';

export class CaseController {
  getAllCases(_req: Request, res: Response): void {
    try {
      const cases = caseService.getAllCases();
      res.json(cases);
    } catch (error) {
      console.error('Error getting cases:', error);
      res.status(500).json({ error: 'Failed to get cases' });
    }
  }

  getCase(req: Request<{ id: string }>, res: Response): void {
    try {
      const { id } = req.params;
      const caseData = caseService.getCaseForFrontend(id);
      
      if (!caseData) {
        res.status(404).json({ error: 'Case not found' });
        return;
      }
      
      res.json(caseData);
    } catch (error) {
      console.error('Error getting case:', error);
      res.status(500).json({ error: 'Failed to get case' });
    }
  }

  getCaseEvidence(req: Request<{ id: string }>, res: Response): void {
    try {
      const { id } = req.params;
      const caseData = caseService.getCaseForFrontend(id);
      
      if (!caseData) {
        res.status(404).json({ error: 'Case not found' });
        return;
      }
      
      res.json(caseData.evidence || []);
    } catch (error) {
      console.error('Error getting evidence:', error);
      res.status(500).json({ error: 'Failed to get evidence' });
    }
  }

  getCaseMilestones(req: Request<{ id: string }>, res: Response): void {
    try {
      const { id } = req.params;
      const caseData = caseService.getCase(id);
      
      if (!caseData) {
        res.status(404).json({ error: 'Case not found' });
        return;
      }
      
      // Return milestone metadata without the actual discovery logic
      const milestoneMetadata = Object.entries(caseData.milestones || {}).map(([key, milestone]) => ({
        id: key,
        title: milestone.title,
        category: milestone.category,
        importance: milestone.importance
      }));
      
      res.json(milestoneMetadata);
    } catch (error) {
      console.error('Error getting milestones:', error);
      res.status(500).json({ error: 'Failed to get milestones' });
    }
  }
}

export default new CaseController();