import { TicketStatus } from '@prisma/client';
import * as error from '@/errors';
import * as activityRepository from '@/repositories/activity-repository';

export async function getDates(userId: number) {
  const ticket = await activityRepository.findTicketByUserId(userId);
  if (!ticket) throw error.paymentRequiredError();
  if (ticket.status !== TicketStatus.PAID) throw error.paymentRequiredError();
  if (ticket.TicketType.isRemote) throw error.forBiddenError();

  const response = await activityRepository.findDates();
  if (!response) throw error.notFoundError();
  return;
}

export async function getAtcivityByDate(date: string, userId: number) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(date) === false) throw { status: 400, message: 'Invalid date format' };
  const minDate = `${date}T00:00:00.000Z`;
  const maxDate = `${date}T23:59:59.000Z`;

  const response = await activityRepository.findByDate(minDate, maxDate);

  if (!response) throw error.notFoundError();

  return response;
}

export async function subscribe(activityId: number, userId: number) {
  const ticket = await activityRepository.findTicketByUserId(userId);
  if (!ticket) throw error.paymentRequiredError();
  if (ticket.status !== TicketStatus.PAID) throw error.paymentRequiredError();
  if (ticket.TicketType.isRemote) throw error.forBiddenError();

  const activity = await activityRepository.findActivityById(activityId);
  if (!activity) throw error.notFoundError();
  if (activity._count.Subscription >= activity.capacity) throw error.conflictError('Capacity is full');

  const response = await activityRepository.subscribe(activityId, userId);

  if (!response) throw error.notFoundError();

  return response;
}
