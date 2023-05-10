import { prisma } from '@/config';

export async function findDates() {
  return prisma.activity.findMany({
    select: {
      startsAt: true,
    },
  });
}

export async function findByDate(minDate: Date, maxDate: Date) {
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

export async function subscribe(activityId: number, userId: number) {
  return prisma.subscription.create({
    data: {
      activityId,
      userId,
    },
  });
}
