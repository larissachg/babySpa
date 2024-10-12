import { Request, Response } from "express";

import * as userService from "../services";
import { UserInterface } from "../interfaces";
import config from "../../config";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataUsuario = req.body as UserInterface;

    const newUser = await userService.registerNewUser(dataUsuario);

    res.status(201).json({
      success: true,
      message: "Usuario registrado con éxito",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al registrar al usuario: ${error.message}`,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const dataUsuario = req.body as UserInterface;

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "El ID del usuario no es válido",
    });
    return;
  }

  try {
    const update = await userService.updateUser(id, dataUsuario);

    res.status(201).json({
      success: true,
      message: "Datos del usuario actualizados con éxito",
      data: update,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al actualizar el usuario: ${error.message}`,
    });
  }
};

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userService.getAllUser();

    res.status(200);
    res.json({
      success: true,
      message: "Datos obtenidos con exito",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);

    res.status(200);
    res.json({
      success: true,
      message: "Datos obtenidos con exito",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
export const validateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataUsuario = req.body as UserInterface;

    const loginData = await userService.validateUser(dataUsuario.Usuario, dataUsuario.Password);

    res.cookie("Authentication", loginData.token, {
      httpOnly: true, // No accesible desde el frontend (previene XSS)
      secure: config.environment === "production", // Solo envía la cookie por HTTPS en producción
      sameSite: "strict", // Previene CSRF
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 día
    });

    res.status(200);
    res.json({
      success: true,
      message: "Datos obtenidos con exito",
      data: loginData.user,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const dataUsuario = req.body as UserInterface;

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "El ID del usuario no es válido",
    });
    return;
  }

  try {
    const update = await userService.updateUserPassword(id, dataUsuario.Password);

    res.status(201).json({
      success: true,
      message: "Datos del usuario actualizados con éxito",
      data: update,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error al actualizar el usuario: ${error.message}`,
    });
  }
};