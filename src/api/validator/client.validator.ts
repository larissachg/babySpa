import { check } from "express-validator";
import { validateResult } from "../middleware/validator";

const validateCreateClient = [
  check(
    "datosCliente.NombreBebe",
    "El nombre es obligatorio y tiene que ser un texto"
  )
    .notEmpty()
    .isString(),

  check("datosCliente.FechaNac", "Fecha de nacimiento no válida")
    .notEmpty()
    .isISO8601()
    .toDate(),

  check("datosCliente.SemanaNac", "Semana de nacimiento debe ser un número")
    .optional()
    .isInt({ min: 1 }),

  check("datosCliente.Parto", "El campo Parto debe ser 'Natural' o 'Cesarea'")
    .optional()
    .isIn(["Natural", "Cesarea"]),

  check("datosCliente.PesoNac", "Peso de nacimiento debe ser un número")
    .optional()
    .isDecimal(),

  check("datosCliente.PesoActual", "Peso actual debe ser un número")
    .optional()
    .isDecimal(),

  check(
    "datosCliente.Genero",
    "El campo Genero debe ser 'Femenino' o 'Masculino'"
  )
    .notEmpty()
    .isIn(["Femenino", "Masculino"]),

  check("datosCliente.NombreMama", "El nombre de la mamá debe ser un texto")
    .optional()
    .isString(),

  check("datosCliente.EdadMama", "La edad de la mamá debe ser un número entero")
    .optional()
    .isInt({ min: 0 }),

  check("datosCliente.NombrePapa", "El nombre del papá debe ser un texto")
    .optional()
    .isString(),

  check("datosCliente.EdadPapa", "La edad del papá debe ser un número")
    .optional()
    .isInt({ min: 0 }),

  check("datosCliente.Celular", "El número de celular es obligatorio")
    .notEmpty()
    .isString(),

  check(
    "datosCliente.CodigoPais",
    "El código del país debe ser una cadena de texto"
  )
    .optional()
    .isString(),

  check("datosCliente.Email", "El email no es válido").optional().isEmail(),

  check("datosCliente.AutorizacionRrss", "Selecciona una opcion")
    .optional()
    .isBoolean(),

  check(
    "datosCliente.UsuarioRrss",
    "El nombre de usuario de RRSS debe ser un texto"
  )
    .optional()
    .isString(),

  check(
    "datosCliente.ConocimientoBabySpa",
    "Conocimiento sobre BabySpa debe ser un texto"
  )
    .optional()
    .isString(),

  check("datosMedicos.DificultadNacer", "Debe ser un texto")
    .optional()
    .isString(),

  check("datosMedicos.EstimulacionPrevia", "Debe ser un texto")
    .optional()
    .isString(),

  check(
    "datosMedicos.CentroEstimulacionPrevia",
    "Centro de estimulación previa debe ser un texto"
  )
    .optional()
    .isString(),

  check(
    "datosMedicos.DiagnosticoAlteracion",
    "Diagnóstico de alteración debe ser un texto"
  )
    .optional()
    .isString(),

  check(
    "datosMedicos.EnfermedadDiagnosticada",
    "Enfermedad diagnosticada debe ser un texto"
  )
    .optional()
    .isString(),

  check(
    "datosMedicos.MedicamentoReciente",
    "Medicamento reciente debe ser un texto"
  )
    .optional()
    .isString(),

  validateResult,
];

const validateFirstEvaluation = [
  check("Visual", "El campo Visual debe ser 'Sigue' o 'NoSigue'")
    .optional()
    .isIn(["Sigue", "NoSigue"]),

  check("ContactoVisual", "El campo ContactoVisual debe ser 'Si' o 'No'")
    .optional()
    .isIn(["Si", "No"]),

  check("Auditivo", "El campo Auditivo debe ser 'Sigue' o 'NoSigue'")
    .optional()
    .isIn(["Sigue", "NoSigue"]),

  check(
    "Musculatura",
    "El campo Musculatura debe ser 'Bajo', 'Normal', o 'Tension'"
  )
    .optional()
    .isIn(["Bajo", "Normal", "Tension"]),

  check("ControlCervical", "El campo ControlCervical debe ser 'Si' o 'No'")
    .optional()
    .isIn(["Si", "No"]),

  check("CabezaAlzada", "El campo CabezaAlzada debe ser 'Si' o 'No'")
    .optional()
    .isIn(["Si", "No"]),

  check("Sentado", "El campo Sentado debe ser 'Si' o 'No'")
    .optional()
    .isIn(["Si", "No"]),

  check("Gateo", "El campo Gateo debe ser 'Si' o 'No'")
    .optional()
    .isIn(["Si", "No"]),

  check("Caminar", "El campo Caminar debe ser 'Si' o 'No'")
    .optional()
    .isIn(["Si", "No"]),

  check(
    "EstadoAnimo",
    "El campo EstadoAnimo debe ser 'Tranquilo' o 'Irritable'"
  )
    .optional()
    .isIn(["Tranquilo", "Irritable"]),

  validateResult,
];
export { validateCreateClient, validateFirstEvaluation };
