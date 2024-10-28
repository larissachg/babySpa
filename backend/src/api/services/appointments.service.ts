import { PrismaClient } from "@prisma/client";
import { AppointmentInterface } from "../interfaces";

const prisma = new PrismaClient();

export const registerNewAppointment = async (data: AppointmentInterface) => {
  try {
    const newAppointment = await prisma.citas.create({
      data: {
        ...data,
        FechaInicio: new Date(data.FechaInicio),
        FechaFin: new Date(data.FechaFin),
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
        FechaInicio: new Date(data.FechaInicio),
        FechaFin: new Date(data.FechaFin),
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
    const appointments = await prisma.citas.findMany({
      include: {
        DatosClientes: true,
        Productos: true,
      },
    });

    return appointments;
  } catch (error) {
    throw new Error(`Error al obtener las citas: ${error.message}`);
  }
};

export const getAppointmentById = async (id: number) => {
  try {
    const appointment = await prisma.citas.findUnique({
      where: {
        IdCita: id,
      },
      include: {
        DatosClientes: true,
        Productos: true,
      },
    });

    return appointment;
  } catch (error) {
    throw new Error(`Error al obtener la cita: ${error.message}`);
  }
};
