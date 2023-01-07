import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("/", )
  .post("/:activityId", );

export { activityRouter };
