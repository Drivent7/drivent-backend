import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createPresentialWithHotelReserved() {
    // User
    const incomingPassword = "123456";
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    const userPresentialWithHotelReserved = await prisma.user.create({
      data: {
        email: "van@ig.com",
        password: hashedPassword,
      },
    });

    // Enrollment

    const enrollmentPresentialWithHotelReserved = await prisma.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: "15265476389",
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: userPresentialWithHotelReserved.id,
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
    const TicketPresentialWithHotelReserved = await prisma.ticket.create({
      data: {
        enrollmentId: userPresentialWithHotelReserved.id,
        ticketTypeId: 3,
        status: TicketStatus.RESERVED,
      },
    });
  
}