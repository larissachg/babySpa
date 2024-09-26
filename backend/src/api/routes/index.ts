import { Router } from "express";
import { router as productsRouter } from "./products.routes";
import { router as clientsRouter } from "./clients.routes";
import { router as appointmentsRouter } from "./appointments.routes";
import { router as salesRouter } from "./sales.routes";

const router = Router();

router.use("/products", productsRouter);
router.use("/clients", clientsRouter);
router.use("/appointments", appointmentsRouter);
router.use("/sales", salesRouter);

export { router };
