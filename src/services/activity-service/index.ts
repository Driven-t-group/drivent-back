import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as activityRepository from '@/repositories/activity-repository';

export async function getDates(userId: number) {
  const ticket = await activityRepository.findTicketByUserId(userId);
  if (!ticket) throw { status: httpStatus.PAYMENT_REQUIRED, message: 'Payment required' };
  if (ticket.status !== TicketStatus.PAID) throw { status: httpStatus.PAYMENT_REQUIRED, message: 'Payment required' };
  if (ticket.TicketType.isRemote) throw { status: httpStatus.FORBIDDEN, message: 'Forbidden' };

  const response = await activityRepository.findDates();
  if (response.length === 0) throw { status: 404, message: 'No activities for this event yet.' };
  const datesArray = response.map((activity) => activity.startsAt.toISOString().split('T')[0]);
  return [...new Set(datesArray)];
}

export async function getAtcivityByDate(date: string, userId: number) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(date) === false) throw { status: 400, message: 'Invalid date format' };
  const minDate = `${date}T00:00:00.000Z`;
  const maxDate = `${date}T23:59:59.000Z`;

  const response = await activityRepository.findByDate(minDate, maxDate);

  if (!response) throw { status: 404, message: 'No activities for this date yet.' };

  const subscriptions = await activityRepository.findUserSubscriptions(userId);
  const subscribedActivities = subscriptions.map((subscription) => subscription.activityId);

  const responseWithSubscriptions: object[] = response.map((activity) => {
    if (subscribedActivities.includes(activity.id)) {
      return { ...activity, subscribed: true };
    }
    return { ...activity, subscribed: false };
  });
  // if (response.length === 0) throw { status: 404, message: 'No activities for this date yet.' };

  return responseWithSubscriptions;
}

export async function subscribe(activityId: number, userId: number) {
  const ticket = await activityRepository.findTicketByUserId(userId);
  if (!ticket) throw { status: httpStatus.PAYMENT_REQUIRED, message: 'Payment required' };
  if (ticket.status !== TicketStatus.PAID) throw { status: httpStatus.PAYMENT_REQUIRED, message: 'Payment required' };
  if (ticket.TicketType.isRemote) throw { status: httpStatus.FORBIDDEN, message: 'Forbidden' };

  const activity = await activityRepository.findActivityById(activityId);
  if (!activity) throw { status: httpStatus.NOT_FOUND, message: 'Activity not found' };
  if (activity._count.Subscription >= activity.capacity)
    throw { status: httpStatus.CONFLICT, message: 'Capacity reached' };

  const verifySubscription = await activityRepository.verifySubscription(activityId, userId);
  if (verifySubscription) throw { status: httpStatus.CONFLICT, message: 'Already subscribed' };

  const response = await activityRepository.subscribe(activityId, userId);

  if (!response) throw { status: 500, message: 'Error subscribing to activity' };

  return response;
}
