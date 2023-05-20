import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createUserOrSession } from '@/services/oauth-service';

export async function signupOrLogin(req: Request, res: Response) {
  try {
    const { code } = req.query;
    const response = await createUserOrSession(String(code));
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
