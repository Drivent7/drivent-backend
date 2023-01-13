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

  // dia 05
  await prisma.activity.createMany({
    data: [
      {
      title: "Palestra 1",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T07:00").toDate(),
    },{
      title: "Palestra 2",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },
    {
      title: "Workshop 1",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T07:00").toDate(),
    },{
      title: "Palestra 11",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T07:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },{
      title: "Palestra 12",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T08:00").toDate(),
      endsAt: dayjs("2023-01-05T09:00").toDate(),
    },
    {
      title: "Workshop 11",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-05").toDate(),
      startsAt: dayjs("2023-01-05T07:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },
    
  ]
  });

  // dia 06
  await prisma.activity.createMany({
    data: [
      {
      title: "Palestra 21",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-06").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T07:00").toDate(),
    },{
      title: "Palestra 22",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-06").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },
    {
      title: "Workshop 21",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-06").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T07:00").toDate(),
    },{
      title: "Palestra 221",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-06").toDate(),
      startsAt: dayjs("2023-01-05T07:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },{
      title: "Palestra 222",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-06").toDate(),
      startsAt: dayjs("2023-01-05T08:00").toDate(),
      endsAt: dayjs("2023-01-05T09:00").toDate(),
    },
    {
      title: "Workshop 221",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-06").toDate(),
      startsAt: dayjs("2023-01-05T07:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },
  ]
  });

  // dia 07

  await prisma.activity.createMany({
    data: [
      {
      title: "Palestra 31",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-07").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T07:00").toDate(),
    },{
      title: "Palestra 32",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-07").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },
    {
      title: "Workshop 31",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-07").toDate(),
      startsAt: dayjs("2023-01-05T06:00").toDate(),
      endsAt: dayjs("2023-01-05T07:00").toDate(),
    },{
      title: "Palestra 331",
      location: "Auditório principal",
      capacity: 10,
      dateEntity: dayjs("2023-01-07").toDate(),
      startsAt: dayjs("2023-01-05T07:00").toDate(),
      endsAt: dayjs("2023-01-05T08:00").toDate(),
    },{
      title: "Palestra 322",
      location: "Auditório lateral",
      capacity: 11,
      dateEntity: dayjs("2023-01-07").toDate(),
      startsAt: dayjs("2023-01-05T08:00").toDate(),
      endsAt: dayjs("2023-01-05T09:00").toDate(),
    },
    {
      title: "Workshop 331",
      location: "Sala de workshop",
      capacity: 12,
      dateEntity: dayjs("2023-01-07").toDate(),
      startsAt: dayjs("2023-01-05T07:00").toDate(),
      endsAt: dayjs("2023-01-05T010:00").toDate(),
    },
    
  ]
  });
}
