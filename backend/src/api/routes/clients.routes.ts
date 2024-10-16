import { Router } from "express";
import {
  firstEvaluation,
  getClient,
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
router.get("/:id", [validateAuthentication], getClient);

export { router };
