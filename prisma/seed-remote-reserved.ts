import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createRemoteReserved() {
  // User
  const incomingPassword = "123456";
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  const userRemoteReserved = await prisma.user.create({
    data: {
      email: "cid@ig.com",
      password: hashedPassword,
    },
  });

  // Enrollment

  const enrollmentRemoteReserved = await prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: "73329681772",
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber("(##) 9####-####"),
      userId: userRemoteReserved.id,
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
  const TicketRemoteReserved = await prisma.ticket.create({
    data: {
      enrollmentId: enrollmentRemoteReserved.id,
      ticketTypeId: 1,
      status: TicketStatus.RESERVED,
    },
  });
}
