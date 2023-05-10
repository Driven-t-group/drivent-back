import { Router } from 'express';
import { getDefaultEvent } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import * as activityController from '@/controllers/activity-controller';

const activityRouter = Router();

activityRouter
  .get('/dates', authenticateToken, activityController.getDates)
  .get('/dates/:date', authenticateToken, activityController.getAtcivityByDate)
  .post('/subscribe/:eventId', authenticateToken, activityController.subscribe);
export { activityRouter };
