import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createRemotePaid() {
    // User
    const incomingPassword = "123456";
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    const userRemotePaid = await prisma.user.create({
      data: {
        email: "rod@ig.com",
        password: hashedPassword,
      },
    });

    // Enrollment

    const enrollmentRemotePaid = await prisma.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: "12345678910",
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: userRemotePaid.id,
        Address: {
          create: {
            street: faker.address.streetName(),
            cep: faker.address.zipCode(),
            city: faker.address.city(),
            neighborhood: faker.address.city(),
            number: faker.datatype.number().toString(),
            state: faker.address.state(),
          },
        },
      },
      include: {
        Address: true,
      },
    });

    // Ticket
    

    const TicketRemotePaid = await prisma.ticket.create({
      data: {
        enrollmentId: enrollmentRemotePaid.id,
        ticketTypeId: 1,
        status: TicketStatus.PAID,
      },
      include:{
        TicketType:true,
      }
    });

    
    //Payment

    const paymentRemote = await prisma.payment.create({
      data: {
        ticketId: TicketRemotePaid.id,
        value:TicketRemotePaid.TicketType.price,
        cardIssuer: faker.name.findName(),
        cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
      },
    });
  
}