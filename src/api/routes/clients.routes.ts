import { Router } from "express";
import {
  firstEvaluation,
  getClients,
  registerClient,
  updateClient,
} from "../controllers";
import { validateCreateClient, validateFirstEvaluation } from "../validator";

const router = Router();

router.post("/", [...validateCreateClient], registerClient);

router.post("/:id", [...validateFirstEvaluation], firstEvaluation);

router.put("/:id", [...validateCreateClient], updateClient);

router.get("/", [], getClients);

export { router };
