import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createPresentialNoHotelReserved() {
    // User
    const incomingPassword = "123456";
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    const userPresentialNoHotelReserved = await prisma.user.create({
      data: {
        email: "dan@ig.com",
        password: hashedPassword,
      },
    });

    // Enrollment

    const enrollmentPresentialNoHotelReserved = await prisma.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: "15265476389",
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: userPresentialNoHotelReserved.id,
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
    const TicketPresentialNoHotelReserved = await prisma.ticket.create({
      data: {
        enrollmentId: userPresentialNoHotelReserved.id,
        ticketTypeId: 2,
        status: TicketStatus.RESERVED,
      },
    });
  
}