import { PrismaClient, TicketStatus } from "@prisma/client";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
    // User
    const incomingPassword = "123456";
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: "cid@fla.com",
        password: hashedPassword,
      },
    });

    // TicketType
    const ticketTypeRemote = await prisma.ticketType.create({
      data: {
        name: "Ticket tipo 1",
        price: 200,
        isRemote: true,
        includesHotel: false,
      },
    });

    const ticketTypePresentialWithoutHotel = await prisma.ticketType.create({
      data: {
        name: "Ticket tipo 2",
        price: 400,
        isRemote: false,
        includesHotel: false,
      },
    });

    const ticketTypeWithHotel = await prisma.ticketType.create({
      data: {
        name: "Ticket tipo 3",
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    });

    // Enrollment

    const enrollment = await prisma.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: "73329681772",
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: user.id,
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
    const TicketReserved = await prisma.ticket.create({
      data: {
        enrollmentId: enrollment.id,
        ticketTypeId: ticketTypeRemote.id,
        status: TicketStatus.RESERVED,
      },
    });

    console.log({ event });
    console.log({ TicketReserved });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
