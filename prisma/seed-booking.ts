import faker from "@faker-js/faker";
import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default async function createBooking(){

  await prisma.booking.create({
    data: {
      userId: 6,
      roomId:1,
    }
  });

  await prisma.booking.create({
    data: {
      userId: 7,
      roomId:5,
    }
  });

  await prisma.booking.create({
    data: {
      userId: 8,
      roomId:9,
    }
  });
}