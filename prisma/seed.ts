import { Location, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import faker from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  await prisma.activity.createMany({
    data: [
      {
        title: faker.lorem.words(3),
        capacity: faker.datatype.number({min: 1, max: 6}),
        location: Location.Lateral,
        startsAt: '2023-05-10T10:00:00.000Z',
        endsAt: '2023-05-10T11:00:00.000Z',
      },
      {
        title: faker.lorem.words(3),
        capacity: faker.datatype.number({min: 1, max: 6}),
        location: Location.Principal,
        startsAt: '2023-05-11T05:00:00.000Z',
        endsAt: '2023-05-11T06:30:00.000Z',
      },
      {
        title: faker.lorem.words(3),
        capacity: 0,
        location: Location.Workshop,
        startsAt: '2023-05-11T08:00:00.000Z',
        endsAt: '2023-05-11T09:00:00.000Z',
      },
    ],
  });

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
