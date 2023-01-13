import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, createReservation } from "@/controllers";

const activityRouter = Router();

activityRouter
  // .all("/*", authenticateToken)
  .get("/", getActivities)
  .post("/:activityId", createReservation);

export { activityRouter };
