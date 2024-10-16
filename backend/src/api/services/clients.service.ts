import { PrismaClient } from "@prisma/client";
import { ClientInterface, FirstEvaluationInterface } from "../interfaces";

const prisma = new PrismaClient();

export const registerNewClient = async (data: ClientInterface) => {
  try {
    const newClient = await prisma.datosClientes.create({
      data: {
        ...data.datosCliente,
        DatosMedicos: {
          create: { ...data.datosMedicos },
        },
      },
    });

    return newClient;
  } catch (error) {
    throw new Error(`Error al registrar el cliente: ${error.message}`);
  }
};

export const registerFirstEvaluation = async (
  id: number,
  data: FirstEvaluationInterface
) => {
  try {
    const newEvaluation = await prisma.datosPrimeraEvaluciacion.create({
      data: {
        ...data,
        IdCliente: id,
      },
    });

    return newEvaluation;
  } catch (error) {
    throw new Error(
      `Error al registrar la primera evaluacion del cliente: ${error.message}`
    );
  }
};

export const updateClientById = async (id: number, data: ClientInterface) => {
  try {
    const updateClient = await prisma.datosClientes.update({
      where: {
        IdCliente: id,
      },
      data: {
        ...data.datosCliente,
        DatosMedicos: {
          update: { data: data.datosMedicos },
        },
      },
    });

    return updateClient;
  } catch (error) {
    throw new Error(`Error al actualizar los datos del cliente: ${error.message}`);
  }
};

export const getClientsFile = async () => {
  try {
    const clients = await prisma.datosClientes.findMany({
      include: {
        DatosMedicos: true,
        DatosPrimeraEvaluciacion: true,
      },
    });

    return clients;
  } catch (error) {
    throw new Error(`Error al obtener los clientes: ${error.message}`);
  }
};

export const getClientById = async (id: number) => {
  try {
    const client = await prisma.datosClientes.findUnique({
      where: {
        IdCliente: +id
      },
      include: {
        DatosMedicos: true,
        DatosPrimeraEvaluciacion: true,
      },
    });

    return client;
  } catch (error) {
    throw new Error(`Error al obtener el cliente: ${error.message}`);
  }
};
