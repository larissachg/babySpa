import { check } from "express-validator";
import { validateResult } from "../middleware/validator";

const validRoles = ["Caja", "Admin", "Fisio"];

const validateRegisterUser = [
    check("Nombre", "El nombre es obligatorio y debe ser un texto")
        .notEmpty()
        .isString(),

    check("Email", "Debe ser un email válido")
        .optional()
        .isEmail(),

    check("Usuario", "El usuario es obligatorio y debe ser un texto")
        .notEmpty()
        .isString(),

    check("Password", "La contraseña es obligatoria y debe tener al menos 6 caracteres")
        .notEmpty()
        .isLength({ min: 6 }),

    check("Rol", "El rol es obligatorio y debe ser uno de los siguientes valores: Caja, Admin, Fisio")
        .notEmpty()
        .isIn(validRoles),

    validateResult,
];

const validateUpdateUser = [
    check("Nombre", "El nombre debe ser un texto")
        .optional()
        .isString(),

    check("Email", "Debe ser un email válido")
        .optional()
        .isEmail(),

    check("Usuario", "El usuario debe ser un texto")
        .optional()
        .isString(),

    check("Password", "La contraseña debe tener al menos 6 caracteres")
        .optional()
        .isLength({ min: 6 }),

    check("Rol", "El rol debe ser uno de los siguientes valores: Caja, Admin, Fisio")
        .optional()
        .isIn(validRoles),

    check("Estado", "El estado debe ser un booleano")
        .optional()
        .isBoolean(),

    validateResult,
];

const validateLogin = [
    check('Usuario', 'Nombre de usuario es obligatorio').exists().notEmpty({ ignore_whitespace: true }),
    check('Password', 'Contraseña es obligatorio').exists().notEmpty({ ignore_whitespace: true }),
    validateResult
]

export { validateRegisterUser, validateUpdateUser, validateLogin };
