import { prisma } from "@/config";

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      Reservations: true
    } });
}

async function findActivity(id: number) {
  return prisma.activity.findFirst({
    where: {
      id
    }
  });
}

async function makeReservation(userId: number, activityId: number) {
  return prisma.reservation.create({
    data: {
      userId,
      activityId
    }  
  });
}

const activityRepository = {
  findActivities,
  makeReservation,
  findActivity
};

export default activityRepository;
