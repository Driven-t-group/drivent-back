import faker from '@faker-js/faker';
import { Activity, Location } from '@prisma/client';
import { prisma } from '@/config';

export async function createActivities() {
  return prisma.activity.createMany({
    data: [
      {
        title: faker.lorem.words(3),
        capacity: 1 + faker.datatype.number(5),
        location: Location.Lateral,
        startsAt: '2023-05-10T10:00:00.000Z',
        endsAt: '2023-05-10T11:00:00.000Z',
      },
      {
        title: faker.lorem.words(3),
        capacity: 1 + faker.datatype.number(5),
        location: Location.Principal,
        startsAt: '2023-05-11T05:00:00.000Z',
        endsAt: '2023-05-11T05:30:00.000Z',
      },
      {
        title: faker.lorem.words(3),
        capacity: 1 + faker.datatype.number(5),
        location: Location.Workshop,
        startsAt: '2023-05-11T08:00:00.000Z',
        endsAt: '2023-05-11T08:30:00.000Z',
      },
    ],
  });
}

export async function createActivity() {
  return prisma.activity.create({
    data: {
      title: faker.lorem.words(3),
      capacity: 1 + faker.datatype.number(5),
      location: Location.Lateral,
      startsAt: '2023-05-10T10:00:00.000Z',
      endsAt: '2023-05-10T11:00:00.000Z',
    },
  });
}

export async function createActivityWithFullCapacity() {
  return prisma.activity.create({
    data: {
      title: faker.lorem.words(3),
      capacity: 0,
      location: Location.Lateral,
      startsAt: '2023-05-10T10:00:00.000Z',
      endsAt: '2023-05-10T11:00:00.000Z',
    },
  });
}
