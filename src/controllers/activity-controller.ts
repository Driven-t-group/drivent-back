import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as activityService from '@/services/activity-service';

export async function getDates(_req: Request, res: Response) {
  return res.status(httpStatus.OK).json(await activityService.getDates(1));
}

export async function getAtcivityByDate(_req: Request, res: Response) {
  return res.status(httpStatus.OK).json(await activityService.getDates(1));
}

export async function subscribe(_req: Request, res: Response) {
  return res.status(httpStatus.OK).json(await activityService.getDates(1));
}
