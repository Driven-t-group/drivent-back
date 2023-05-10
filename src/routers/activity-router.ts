import { Router } from 'express';
import { getDefaultEvent } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';

const activityRouter = Router();

activityRouter
  .get('/dates', authenticateToken, () => 0)
  .get('/dates/:dateId', authenticateToken, () => 0)
  .post('/subscribe/:eventId', authenticateToken, () => 0);
export { activityRouter };
