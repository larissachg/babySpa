import { Request, Response } from "express";
import * as clientService from "../services";
import { ClientInterface, FirstEvaluationInterface } from "../interfaces";

export const registerClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataCliente = req.body as ClientInterface;

    const newClient = await clientService.registerNewClient(dataCliente);

    res.status(201).json({
      success: true,
      message: "Cliente registrado con éxito",
      data: newClient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al registrar al cliente: ${error.message}`,
    });
  }
};

export const firstEvaluation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body as FirstEvaluationInterface;

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "El ID del cliente no es válido",
      });
      return;
    }

    const newEvaluation = await clientService.registerFirstEvaluation(id, data);

    res.status(201).json({
      success: true,
      message: "Evaluacion registrada con éxito",
      data: newEvaluation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al registrar la evaluacion del cliente",
    });
  }
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const dataCliente = req.body as ClientInterface;

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "El ID del cliente no es válido",
    });
    return;
  }

  try {
    const newUpdate = await clientService.updateClientById(id, dataCliente);

    res.status(201).json({
      success: true,
      message: "Datos de Cliente actualizado con éxito",
      data: newUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar dato del cliente",
    });
  }
};

export const getClients = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients = await clientService.getClientsFile();

    res.status(200);
    res.json({
      success: true,
      message: "Clientes obtenidos con exito",
      data: clients,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    
    const client = await clientService.getClientById(id);

    res.status(200);
    res.json({
      success: true,
      message: "Cliente obtenido con exito",
      data: client,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
