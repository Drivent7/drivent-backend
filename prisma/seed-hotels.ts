import faker from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Sabe criar objetos - Hotel do banco
export default async function createHotels() {
  const hotel1 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });

  const hotel3 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });

  // hotel 1
  //room cap1
  for (let i = 0; i < 2; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 101, max: 121 }).toString(),
        capacity: 1,
        hotelId: hotel1.id,
      },
    });
  }
  //room cap2
  for (let i = 0; i < 5; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 201, max: 221 }).toString(),
        capacity: 2,
        hotelId: hotel1.id,
      },
    });
  }
  //room cap3
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 301, max: 321 }).toString(),
        capacity: 3,
        hotelId: hotel1.id,
      },
    });
  }

  // hotel 2
  //room cap1
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 101, max: 121 }).toString(),
        capacity: 1,
        hotelId: hotel2.id,
      },
    });
  }
  //room cap2
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 202, max: 222 }).toString(),
        capacity: 2,
        hotelId: hotel2.id,
      },
    });
  }
  //room cap3
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 303, max: 323 }).toString(),
        capacity: 3,
        hotelId: hotel2.id,
      },
    });
  }

  // hotel 2
  //room cap1
  for (let i = 0; i < 2; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 101, max: 121 }).toString(),
        capacity: 1,
        hotelId: hotel3.id,
      },
    });
  }
  //room cap2
  for (let i = 0; i < 5; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 202, max: 222 }).toString(),
        capacity: 2,
        hotelId: hotel3.id,
      },
    });
  }
  //room cap3
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.datatype.number({ min: 303, max: 323 }).toString(),
        capacity: 3,
        hotelId: hotel3.id,
      },
    });
  }
}
