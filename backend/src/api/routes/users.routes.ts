import { Router } from "express";
import {
  getUsers,
  registerUser,
  updateUser,
  updateUserPassword,
  validateUser,
} from "../controllers";
import { validateLogin, validateRegisterUser, validateUpdateUser } from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.post("/", [validateAuthentication, ...validateRegisterUser], registerUser);
router.put("/:id", [...validateUpdateUser], updateUser);
router.put("/updatePassword/:id", [...validateUpdateUser], updateUserPassword);
router.get("/", [], getUsers);
router.post("/login", [...validateLogin], validateUser);

export { router };