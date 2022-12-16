import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
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

    let ticketTypes = await prisma.ticketType.findFirst();
    if (!ticketTypes) {
      await prisma.ticketType.createMany({
        data: [
          {
            name: "Presencial",
            price: 1000,
            isRemote: false,
            includesHotel: true,
            updatedAt: dayjs().add(1, "second").toDate(),
          },
          {
            name: "Presencial",
            price: 100,
            isRemote: false,
            includesHotel: false,
            updatedAt: dayjs().add(1, "second").toDate(),
          },
          {
            name: "Online",
            price: 10,
            isRemote: true,
            includesHotel: false,
            updatedAt: dayjs().add(1, "second").toDate(),
          },
        ],
      });
    }
  }

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
