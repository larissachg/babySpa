import { Router } from "express";
import { getSales, registerSale } from "../controllers";
import { validateSale } from "../validator";

const router = Router();

router.post("/", [...validateSale], registerSale);
// router.put("/:id", [...validateSale], updateSale);
router.get("/", [], getSales);

export { router };
