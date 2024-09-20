import { Router } from "express";
import { router as clientsRouter } from "./clients.routes";

const router = Router();

router.use("/clients", clientsRouter);

export { router };
