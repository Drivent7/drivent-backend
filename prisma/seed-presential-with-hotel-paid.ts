import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createPresentialWithHotelPaid() {
    // User
    const incomingPassword = "123456";
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    const userPresentialWithHotelPaid = await prisma.user.create({
      data: {
        email: "vol@ig.com",
        password: hashedPassword,
      },
    });

    // Enrollment

    const enrollmentPresentialWithHotelPaid = await prisma.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: "15265476389",
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: userPresentialWithHotelPaid.id,
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
    const TicketPresentialWithHotelPaid = await prisma.ticket.create({
      data: {
        enrollmentId: userPresentialWithHotelPaid.id,
        ticketTypeId: 3,
        status: TicketStatus.PAID,
      },
      include:{
        TicketType:true,
      }
    });

    //Payment
    const paymentPresentialWithHotel = await prisma.payment.create({
      data: {
        ticketId: TicketPresentialWithHotelPaid.id,
        value:TicketPresentialWithHotelPaid.TicketType.price,
        cardIssuer: faker.name.findName(),
        cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
      },
    });
  
}