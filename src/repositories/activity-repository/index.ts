import { Activity } from '@prisma/client';
import { prisma } from '@/config';

export async function findDates() {
  return prisma.activity.findMany({
    select: {
      startsAt: true,
    },
  });
}

export async function findByDate(minDate: string, maxDate: string) {
  return prisma.activity.findMany({
    where: {
      startsAt: {
        gte: minDate,
        lte: maxDate,
      },
    },
    include: {
      _count: {
        select: { Subscription: true },
      },
    },
  });
}

export async function findActivityById(id: number) {
  return prisma.activity.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: { Subscription: true },
      },
    },
  });
}

export async function subscribe(activityId: number, userId: number) {
  return prisma.subscription.create({
    data: {
      activityId,
      userId,
    },
  });
}

export async function verifySubscription(activityId: number, userId: number) {
  return prisma.subscription.findFirst({
    where: {
      activityId,
      userId,
    },
  });
}

export async function findTicketByUserId(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

export async function findUserSubscriptions(userId: number) {
  return prisma.subscription.findMany({
    where: {
      userId,
    },
    select: {
      activityId: true,
    },
  });
}
