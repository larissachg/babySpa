import { check } from "express-validator";
import { validateResult } from "../middleware/validator";

const validCategories = ["Servicio", "ServicioMommy", "Item"];

const validateCreateProduct = [
  check("Nombre", "El nombre es obligatorio y tiene que ser un texto")
    .notEmpty()
    .isString(),

  check("Descripcion", "La descripción debe tener máximo 50 caracteres")
    .optional()
    .isString(),

  check("Precio", "El precio es obligatorio").notEmpty().isDecimal(),

  check("Costo", "El costo debe ser un número decimal válido")
    .optional()
    .isDecimal(),

  check("Categoria", "El producto debe pertenecer a una categoria")
    .notEmpty()
    .isIn(validCategories),

  check("Estado", "El estado debe ser un valor booleano")
    .optional()
    .isBoolean(),

  validateResult,
];

const validateUpdateProduct = [
  check("Nombre", "El nombre debe ser texto").optional().isString(),

  check("Descripcion", "La descripción debe tener máximo 50 caracteres")
    .optional()
    .isString(),

  check("Precio", "El precio es obligatorio").optional().isDecimal(),

  check("Costo", "El costo debe ser un número decimal válido")
    .optional()
    .isDecimal(),

  check("Categoria", "El producto debe pertenecer a una categoria")
    .optional()
    .isIn(validCategories),

  check("Estado", "El estado debe ser un valor booleano")
    .optional()
    .isBoolean(),

  validateResult,
];

export { validateCreateProduct, validateUpdateProduct };
