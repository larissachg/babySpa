import { PrismaClient } from "@prisma/client";
import { AppointmentInterface } from "../interfaces";

const prisma = new PrismaClient();

export const registerNewAppointment = async (data: AppointmentInterface) => {
  try {
    const newAppointment = await prisma.citas.create({
      data: {
        ...data,
        Fecha: new Date(data.Fecha),
      },
    });

    return newAppointment;
  } catch (error) {
    throw new Error(`Error al registrar la cita del cliente: ${error.message}`);
  }
};

export const updateAppointmentById = async (
  id: number,
  data: AppointmentInterface
) => {
  try {
    const updateAppointment = await prisma.citas.update({
      where: {
        IdCita: id,
      },
      data: {
        ...data,
        Fecha: new Date(data.Fecha),
      },
    });

    return updateAppointment;
  } catch (error) {
    throw new Error(
      `Error al actualizar la cita del cliente: ${error.message}`
    );
  }
};

export const getAllAppointment = async () => {
  try {
    const appointments = await prisma.citas.findMany();

    return appointments;
  } catch (error) {
    throw new Error(
      `Error al obtener las citas: ${error.message}`
    );
  }
};
