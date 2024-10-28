import { Router } from "express";
import {
  getAppointment,
  getAppointments,
  registerAppointment,
  updateAppointment,
} from "../controllers";
import { validateAppointment, updateAppointments } from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  [validateAuthentication, ...validateAppointment],
  registerAppointment
);
router.put(
  "/:id",
  [validateAuthentication, ...updateAppointments],
  updateAppointment
);
router.get("/", [validateAuthentication], getAppointments);
router.get("/:id", [validateAuthentication], getAppointment);

export { router };
