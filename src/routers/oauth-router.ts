import { Router } from 'express';
import { signupOrLogin } from '@/controllers';

const oauthRouter = Router();

oauthRouter.post('/', signupOrLogin);

export { oauthRouter };
