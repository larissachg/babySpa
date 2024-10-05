import { Router } from "express";
import { deleteSale, getSales, registerSale } from "../controllers";
import { validateSale } from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.post("/", [validateAuthentication, ...validateSale], registerSale);
router.get("/", [validateAuthentication], getSales);
router.delete("/:id", [validateAuthentication], deleteSale);

export { router };
