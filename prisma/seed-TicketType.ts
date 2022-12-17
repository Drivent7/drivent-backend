import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

// TicketType
export default async function createTicketType(){
  const ticketTypeRemote = await prisma.ticketType.create({
    data: {
      name: "Ticket Remoto",
      price: 200,
      isRemote: true,
      includesHotel: false,
    },
  });
  
  const ticketTypePresentialWithoutHotel = await prisma.ticketType.create({
    data: {
      name: "Ticket Presencial s/ Hotel",
      price: 400,
      isRemote: false,
      includesHotel: false,
    },
  });
  
  const ticketTypeWithHotel = await prisma.ticketType.create({
    data: {
      name: "Ticket Presencial c/ Hotel",
      price: 600,
      isRemote: false,
      includesHotel: true,
    },
  });
} 
