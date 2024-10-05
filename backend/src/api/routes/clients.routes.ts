import { Router } from "express";
import {
  firstEvaluation,
  getClients,
  registerClient,
  updateClient,
} from "../controllers";
import { validateCreateClient, validateFirstEvaluation } from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  [validateAuthentication, ...validateCreateClient],
  registerClient
);

router.post(
  "/:id",
  [validateAuthentication, ...validateFirstEvaluation],
  firstEvaluation
);

router.put(
  "/:id",
  [validateAuthentication, ...validateCreateClient],
  updateClient
);

router.get("/", [validateAuthentication], getClients);

export { router };
