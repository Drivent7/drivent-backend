import { prisma } from "@/config";

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      Reservations: true
    } });
}

const activityRepository = {
  findActivities,
};

export default activityRepository;
