import { Request, Response } from "express";

import { deleteSaleById, getAllSales, registerNewSale } from "../services";
import { VentaDataInterface } from "../interfaces";

export const registerSale = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body as VentaDataInterface;

    const newSale = await registerNewSale(data);

    res.status(201).json({
      success: true,
      message: "Venta registrada con éxito",
      data: newSale,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al registrar la venta: ${error.message}`,
    });
  }
};

export const getSales = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sales = await getAllSales();

    res.status(200);
    res.json({
      success: true,
      message: "Ventas obtenidas con exito",
      data: sales,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const deleteSale = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "El ID del cliente no es válido",
      });
      return;
    }

    const removeSale = await deleteSaleById(id);

    res.status(201).json({
      success: true,
      message: "Venta eliminada con éxito",
      data: removeSale,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al eliminar la venta: ${error.message}`,
    });
  }
};
