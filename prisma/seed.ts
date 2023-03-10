import { Prisma, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import createTicketType from "./seed-TicketType";
import createRemotePaid from "./seed-remote-paid";
import createRemoteReserved from "./seed-remote-reserved";
import createPresentialNoHotelReserved from "./seed-presential-no-hotel-reserved";
import createPresentialNoHotelPaid from "./seed-presential-no-hotel-paid";
import createPresentialWithHotelReserved from "./seed-presential-with-hotel-reserved";
import createPresentialWithHotelPaid from "./seed-presential-with-hotel-paid";
import createRooms from "./seed-rooms";
import createHotels from "./seed-hotels";
import createBooking from "./seed-booking";
import createActivities from "./seed-activities";
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

    createTicketType();
    createHotels();

    createRemoteReserved();
    createRemotePaid();
    createPresentialNoHotelReserved();
    createPresentialNoHotelPaid();
    createPresentialWithHotelReserved();
    createPresentialWithHotelPaid();
    createActivities();
    // createRooms();
    // createBooking();

    console.log({ event });
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
