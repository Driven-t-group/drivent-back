import { prisma } from '@/config';

export async function findFirst() {
  return prisma.event.findFirst();
}
