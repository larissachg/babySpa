import { Router } from "express";
import {
  getAppointments,
  registerAppointment,
  updateAppointment,
} from "../controllers";
import { validateAppointment } from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  [validateAuthentication, ...validateAppointment],
  registerAppointment
);
router.put(
  "/:id",
  [validateAuthentication, ...validateAppointment],
  updateAppointment
);
router.get("/", [validateAuthentication], getAppointments);

export { router };
