import { prisma } from '@/config';

export async function upsertUser(oauth_id: number) {
  return prisma.user.upsert({
    where: { oauth_id },
    create: { oauth_id },
    update: { oauth_id },
  });
}
