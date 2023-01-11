import faker from "@faker-js/faker";
import { PrismaClient, TicketStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
const prisma = new PrismaClient();

export default async function createActivities() {
  // model Activity {
  //   id                 Int      @id @default(autoincrement())
  //   title              String   @db.VarChar(255)
  //   location           String   @db.VarChar(255)
  //   capacity           Int
  //   dateEntity         DateTime @db.Date()
  //   startsAt           DateTime
  //   endsAt             DateTime
  //   createdAt          DateTime @default(now())
  //   updatedAt          DateTime @updatedAt
  //   @@index([dateEntity])
  // }
  await prisma.activity.createMany({
    data: [
      {
      title: "Palestra 1",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T09:00:00").toDate(),
      endsAt: dayjs("2023-01-05T10:00:00").toDate(),
    },{
      title: "Palestra 2",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T09:00:00").toDate(),
      endsAt: dayjs("2023-01-05T11:00:00").toDate(),
    },
    {
      title: "Workshop 1",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T09:00:00").toDate(),
      endsAt: dayjs("2023-01-05T10:00:00").toDate(),
    },
  ]
  });
}
