import { Request, Response } from "express";

import {
  getAllAppointment,
  getAppointmentById,
  registerNewAppointment,
  updateAppointmentById,
} from "../services";
import { AppointmentInterface } from "../interfaces";

export const registerAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataCita = req.body as AppointmentInterface;

    const newAppointment = await registerNewAppointment(dataCita);

    res.status(201).json({
      success: true,
      message: "Cita registrado con éxito",
      data: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al registrar la cita: ${error.message}`,
    });
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const dataCita = req.body as AppointmentInterface;

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "El ID del cita no es válido",
    });
    return;
  }

  try {
    const update = await updateAppointmentById(id, dataCita);

    res.status(201).json({
      success: true,
      message: "Cita actualizado con éxito",
      data: update,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al actualizar la cita: ${error.message}`,
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

export const getAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "El ID del cita no es válido",
    });
    return;
  }

  try {
    const appointment = await getAppointmentById(id);

    res.status(200);
    res.json({
      success: true,
      message: "Cita obtenida con exito",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};