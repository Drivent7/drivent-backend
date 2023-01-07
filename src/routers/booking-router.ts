import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, listAllBookings, deleteBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", listAllBookings)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking)
  .delete("", deleteBooking);

export { bookingRouter };
