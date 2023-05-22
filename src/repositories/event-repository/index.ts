import { prisma } from '@/config';
import { redis } from '@/config/redis';
import { Event } from '@prisma/client';

export async function findFirst() {
  const cachedKey = 'event';
  const cachedEvent = await redis.get(cachedKey);
  if(cachedEvent) {
    const event: Event = JSON.parse(cachedEvent);
    return event;
  }

  const event = await prisma.event.findFirst();

  redis.set(cachedKey, JSON.stringify(event));
  return event;
}
