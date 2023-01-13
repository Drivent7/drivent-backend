import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, createReservation, deleteReservation } from "@/controllers";

const activityRouter = Router();

activityRouter
  // .all("/*", authenticateToken)
  .get("/", getActivities)
  .post("/:activityId", createReservation)
  .delete("/:activityId", deleteReservation);

export { activityRouter };
