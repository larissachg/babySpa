import { Router } from "express";
import {
  getUserById,
  getUsers,
  registerUser,
  updateUser,
  updateUserPassword,
  validateUser,
} from "../controllers";
import {
  validateLogin,
  validateRegisterUser,
  validateUpdateUser,
} from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  [validateAuthentication, ...validateRegisterUser],
  registerUser
);
router.put("/:id", [validateAuthentication, ...validateUpdateUser], updateUser);
router.put(
  "/updatePassword/:id",
  [validateAuthentication, ...validateUpdateUser],
  updateUserPassword
);
router.get("/", [validateAuthentication], getUsers);
router.get("/:id", [validateAuthentication], getUserById);
router.post("/login", [...validateLogin], validateUser);

export { router };
