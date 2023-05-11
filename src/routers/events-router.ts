import { Router } from 'express';
import { getDefaultEvent } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';

const eventsRouter = Router();

eventsRouter.get('/', getDefaultEvent);

export { eventsRouter };
