import { prisma, redis } from "@/config";

async function findActivities() {
  let activities = await redis.get("activities");

  if (!activities) {
    const expire = 60 * 60 * 24;

    activities = JSON.stringify(await prisma.activity.findMany({
      include: {
        Reservations: true
      }
    }));

    await redis.set("activities", activities, {
      EX: expire
    });
  }

  return activities;
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
