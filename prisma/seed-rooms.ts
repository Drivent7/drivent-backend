import faker from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//hotel 1
export default async function createRooms() {
  const hotel = await prisma.hotel.findMany({})
  hotel[0].id
 
  const room1 = await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 3,
      hotelId: 1,
    }
  });

  // await prisma.room.create({
  //   data: {
  //     name: faker.name.findName(),
  //     capacity: 2,
  //     hotelId: 1,
  //   },
  // });

  // await prisma.room.create({
  //   data: {
  //     name: faker.name.findName(),
  //     capacity: 3,
  //     hotelId: 1,
  //   },
  // });

  // //hotel 2

  // await prisma.room.create({
  //   data: {
  //     name: faker.name.findName(),
  //     capacity: 1,
  //     hotelId: 2,
  //   },
  // });

  // await prisma.room.create({
  //   data: {
  //     name: faker.name.findName(),
  //     capacity: 2,
  //     hotelId: 2,
  //   },
  // });

  // await prisma.room.create({
  //   data: {
  //     name: faker.name.findName(),
  //     capacity: 3,
  //     hotelId: 2,
  //   },
  // });
}
