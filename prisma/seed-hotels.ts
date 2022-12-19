import faker from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Sabe criar objetos - Hotel do banco
export default async function createHotels() {
  const hotel1 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });

  const hotel3 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });


  // hotel 1
  //room cap1
  for (let i = 0; i < 3; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 1,
        hotelId: hotel1.id,
      }
    });
  }
  //room cap2
  for (let i = 0; i < 3; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 2,
        hotelId: hotel1.id,
      }
    });
  }
  //room cap3
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 3,
        hotelId: hotel1.id,
      }
    });
  }


  // hotel 2
  //room cap1
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 1,
        hotelId: hotel2.id,
      }
    });
  }
  //room cap2
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 2,
        hotelId: hotel2.id,
      }
    });
  }
  //room cap3
  for (let i = 0; i < 2; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 3,
        hotelId: hotel2.id,
      }
    });
  }

  // hotel 2
  //room cap1
  for (let i = 0; i < 2; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 1,
        hotelId: hotel3.id,
      }
    });
  }
  //room cap2
  for (let i = 0; i < 5; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 2,
        hotelId: hotel3.id,
      }
    });
  }
  //room cap3
  for (let i = 0; i < 4; i++) {
    await prisma.room.create({
      data: {
        name: faker.name.findName(),
        capacity: 3,
        hotelId: hotel3.id,
      }
    });
  }
}
