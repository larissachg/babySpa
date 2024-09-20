import { Request, Response, Router } from "express";
import { getAllClients } from "../controllers/clients.controller";

const router = Router();

router.get(
  "/",
  [],
  async (_req: Request, res: Response): Promise<void> => {
    try {

        const clients = await getAllClients();

      res.status(200);
      res.json({
        success: true,
        message: "Obtenido con exito",
        data: clients
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ success: false, message: error.message });
    }
  }
);

export { router };
