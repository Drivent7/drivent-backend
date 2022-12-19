import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getTicketType(name: string){
  return await prisma.ticketType.findFirst({
    where:{
      name
    }
  })
}