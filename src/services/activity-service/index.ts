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

async function deleteReservation(userId: number, activityId: number) {
  const activity = await activityRepository.findActivity(activityId);
  if(!activity) {
    throw notFoundError();
  }
  const reservation = await activityRepository.findReservation(userId, activityId);
  await activityRepository.removeReservation(reservation.id);
}

const activitiesService = {
  getActivities,
  createReservation,
  deleteReservation,
};

export default activitiesService;
