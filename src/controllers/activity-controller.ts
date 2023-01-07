import { Response } from "express";
import activitiesService from "@/services/activity-service";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createReservation(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.params;

  try {
    const reservation = await activitiesService.createReservation(userId, Number(activityId));
    return res.status(httpStatus.OK).send(reservation);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
