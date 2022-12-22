import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createPresentialWithHotelPaid() {
  // User1
  const incomingPassword = "123456";
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  const userPresentialWithHotelPaid = await prisma.user.create({
    data: {
      email: "book1@ig.com",
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
    include: {
      TicketType: true,
    },
  });

  //Payment
  const paymentPresentialWithHotel = await prisma.payment.create({
    data: {
      ticketId: TicketPresentialWithHotelPaid.id,
      value: TicketPresentialWithHotelPaid.TicketType.price,
      cardIssuer: faker.name.findName(),
      cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    },
  });

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // User2
  const incomingPassword2 = "123456";
  const hashedPassword2 = await bcrypt.hash(incomingPassword, 10);

  const userPresentialWithHotelPaid2 = await prisma.user.create({
    data: {
      email: "book2@ig.com",
      password: hashedPassword,
    },
  });

  // Enrollment
  const enrollmentPresentialWithHotelPaid2 = await prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: "32165498785",
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber("(##) 9####-####"),
      userId: userPresentialWithHotelPaid2.id,
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
  const TicketPresentialWithHotelPaid2 = await prisma.ticket.create({
    data: {
      enrollmentId: userPresentialWithHotelPaid2.id,
      ticketTypeId: 3,
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });

  //Payment
  const paymentPresentialWithHotel2 = await prisma.payment.create({
    data: {
      ticketId: TicketPresentialWithHotelPaid2.id,
      value: TicketPresentialWithHotelPaid2.TicketType.price,
      cardIssuer: faker.name.findName(),
      cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    },
  });

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // User3
  const incomingPassword3 = "123456";
  const hashedPassword3 = await bcrypt.hash(incomingPassword, 10);

  const userPresentialWithHotelPaid3 = await prisma.user.create({
    data: {
      email: "book3@ig.com",
      password: hashedPassword,
    },
  });

  // Enrollment
  const enrollmentPresentialWithHotelPaid3 = await prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: "33165498785",
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber("(##) 9####-####"),
      userId: userPresentialWithHotelPaid3.id,
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
  const TicketPresentialWithHotelPaid3 = await prisma.ticket.create({
    data: {
      enrollmentId: userPresentialWithHotelPaid3.id,
      ticketTypeId: 3,
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });

  //Payment
  const paymentPresentialWithHotel3 = await prisma.payment.create({
    data: {
      ticketId: TicketPresentialWithHotelPaid3.id,
      value: TicketPresentialWithHotelPaid3.TicketType.price,
      cardIssuer: faker.name.findName(),
      cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    },
  });

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // User4
  const incomingPassword4 = "123456";
  const hashedPassword4 = await bcrypt.hash(incomingPassword, 10);

  const userPresentialWithHotelPaid4 = await prisma.user.create({
    data: {
      email: "book4@ig.com",
      password: hashedPassword,
    },
  });

  // Enrollment
  const enrollmentPresentialWithHotelPaid4 = await prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: "43165498785",
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber("(##) 9####-####"),
      userId: userPresentialWithHotelPaid4.id,
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
  const TicketPresentialWithHotelPaid4 = await prisma.ticket.create({
    data: {
      enrollmentId: userPresentialWithHotelPaid4.id,
      ticketTypeId: 3,
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });

  //Payment
  const paymentPresentialWithHotel4 = await prisma.payment.create({
    data: {
      ticketId: TicketPresentialWithHotelPaid4.id,
      value: TicketPresentialWithHotelPaid3.TicketType.price,
      cardIssuer: faker.name.findName(),
      cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    },
  });

  // BOOKING
  await prisma.booking.create({
    data: {
      userId: userPresentialWithHotelPaid.id,
      roomId:1,
    }
  });

  await prisma.booking.create({
    data: {
      userId: userPresentialWithHotelPaid2.id,
      roomId:5,
    }
  });

  await prisma.booking.create({
    data: {
      userId: userPresentialWithHotelPaid3.id,
      roomId:9,
    }
  });

  await prisma.booking.create({
    data: {
      userId: userPresentialWithHotelPaid4.id,
      roomId:9,
    }
  });
}
