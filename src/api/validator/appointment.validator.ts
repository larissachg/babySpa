import { check } from "express-validator";
import { validateResult } from "../middleware/validator";

const validateAppointment = [
  check("IdCliente", "El ID del cliente es un número").optional().isInt(),

  check(
    "Fecha",
    "La fecha y hora es obligatoria y debe estar en un formato válido"
  )
    .notEmpty()
    .isISO8601(),

  check("Estado", "El estado de la cita es obligatorio")
    .notEmpty()
    .isIn(["Agendado", "Realizado", "Cancelado", "NoAsistio"]),

  check("IdProducto", "El ID del producto debe ser un número")
    .notEmpty()
    .isInt(),

  check("Fisioterapeuta", "El nombre del fisioterapeuta debe ser un texto")
    .optional()
    .isString(),

  check("Observacion", "La observación debe ser una texto")
    .optional()
    .isString(),

  validateResult,
];

export { validateAppointment };
