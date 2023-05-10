import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import * as activityService from '@/services/activity-service';

export async function getDates(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const dates = await activityService.getDates(userId);
    return res.status(httpStatus.OK).send(dates);
  } catch (error) {
    return res.status(error.status || 500).send(error.message);
  }
}

export async function getAtcivityByDate(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { date } = req.params;
    const activities = await activityService.getAtcivityByDate(date, userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.status(error.status || 500).send(error.message);
  }
}

export async function subscribe(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activityId } = req.params;
    const response = await activityService.subscribe(Number(activityId), userId);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(error.status || 500).send(error.message);
  }
}
