import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createPresentialNoHotelPaid() {
    // User
    const incomingPassword = "123456";
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    const userPresentialNoHotelPaid = await prisma.user.create({
      data: {
        email: "vic@ig.com",
        password: hashedPassword,
      },
    });

    // Enrollment

    const enrollmentPresentialNoHotelPaid = await prisma.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: "12345678910",
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: userPresentialNoHotelPaid.id,
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
    

    const TicketPresentialNoHotelPaid = await prisma.ticket.create({
      data: {
        enrollmentId: userPresentialNoHotelPaid.id,
        ticketTypeId: 2,
        status: TicketStatus.PAID,
      },
      include:{
        TicketType:true,
      }
    });

    
    //Payment

    const paymentPresentialNoHotel = await prisma.payment.create({
      data: {
        ticketId: TicketPresentialNoHotelPaid.id,
        value:TicketPresentialNoHotelPaid.TicketType.price,
        cardIssuer: faker.name.findName(),
        cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
      },
    });
  
}