import { body, check } from "express-validator";
import { validateResult } from "../middleware/validator";

const validateSale = [
  check("venta.IdCliente", "El ID del cliente debe ser un número entero")
    .optional()
    .isInt(),

  check(
    "venta.Fecha",
    "La fecha es obligatoria y debe estar en un formato válido"
  )
    .notEmpty()
    .isISO8601(),

  check("venta.Total", "El total debe ser un número")
    .notEmpty()
    .isDecimal({ decimal_digits: "0,6" }),

  check("venta.Comentario", "El comentario debe ser una cadena de texto")
    .optional()
    .isString(),

  body("detalle", "Debe haber al menos un detalle de venta").isArray({
    min: 1,
  }),

  body("detalle.*.IdProducto", "El ID del producto debe ser un número entero")
    .notEmpty()
    .isInt(),

  body(
    "detalle.*.Cantidad",
    "La cantidad es obligatoria y debe ser un número entero"
  )
    .notEmpty()
    .isInt({ min: 1 }),

  body("detalle.*.Subtotal", "El subtotal debe ser un número decimal")
    .notEmpty()
    .isDecimal({ decimal_digits: "0,6" }),

  validateResult,
];

export { validateSale };
