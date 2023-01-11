import activityRepository from "@/repositories/activity-repository";
import { notFoundError } from "@/errors";

async function getActivities() {
  const activities = await activityRepository.findActivities();
  return activities;
}

async function createReservation(userId: number, activityId: number) {
  const activity = await activityRepository.findActivity(activityId);
  if(!activity) {
    throw notFoundError();
  }
  const reservation = await activityRepository.makeReservation(userId, activityId);
  return reservation;
}

const activitiesService = {
  getActivities,
  createReservation,
};

export default activitiesService;
