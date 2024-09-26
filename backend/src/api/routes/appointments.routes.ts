import { Router } from "express";
import {
  getAppointments,
  registerAppointment,
  updateAppointment,
} from "../controllers";
import { validateAppointment } from "../validator";

const router = Router();

router.post("/", [...validateAppointment], registerAppointment);
router.put("/:id", [...validateAppointment], updateAppointment);
router.get("/", [], getAppointments);

export { router };
