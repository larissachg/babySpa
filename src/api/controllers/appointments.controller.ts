import { Request, Response } from "express";

import {
  getAllAppointment,
  registerNewAppointment,
  updateAppointmentById,
} from "../services";
import { AppointmentInterface } from "../interfaces";

export const registerAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataCliente = req.body as AppointmentInterface;

    const newAppointment = await registerNewAppointment(dataCliente);

    res.status(201).json({
      success: true,
      message: "Cliente registrado con éxito",
      data: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al registrar al cliente: ${error.message}`,
    });
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const dataCliente = req.body as AppointmentInterface;

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "El ID del cliente no es válido",
    });
    return;
  }

  try {
    const update = await updateAppointmentById(id, dataCliente);

    res.status(201).json({
      success: true,
      message: "Cita de cliente actualizado con éxito",
      data: update,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al actualizar la cita del cliente: ${error.message}`,
    });
  }
};

export const getAppointments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointments = await getAllAppointment();

    res.status(200);
    res.json({
      success: true,
      message: "Citas obtenidas con exito",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
