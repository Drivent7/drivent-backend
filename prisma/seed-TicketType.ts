import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TicketType
export default async function createTicketType(){
  const ticketTypeRemote = await prisma.ticketType.create({
    data: {
      name: "Online",
      price: 200,
      isRemote: true,
      includesHotel: false,
    },
  });

  const ticketTypeWithoutHotel = await prisma.ticketType.create({
    data: {
      name: "Sem Hotel",
      price: 400,
      isRemote: false,
      includesHotel: false,
    },
  });
  
  const ticketTypeWithHotel = await prisma.ticketType.create({
    data: {
      name: "Com Hotel",
      price: 600,
      isRemote: false,
      includesHotel: true,
    },
  });

  const ticketTypePresential = await prisma.ticketType.create({
    data: {
      name: "Presencial",
      price: 400,
      isRemote: false,
      includesHotel: false,
    },
  });
} 
