import activityRepository from "@/repositories/activity-repository";
//import { notFoundError } from "@/errors";

async function getActivities() {
  const activities = await activityRepository.findActivities();
  return activities;
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
