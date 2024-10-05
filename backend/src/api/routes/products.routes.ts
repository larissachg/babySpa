import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getActiveProducts,
  getItemsProducts,
  getProducts,
  getServiceProducts,
  updateProduct,
} from "../controllers/products.controller";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../validator/products.validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.get("/", [validateAuthentication], getProducts);

router.get("/active", [validateAuthentication], getActiveProducts);

router.get("/service", [validateAuthentication], getServiceProducts);

router.get("/items", [validateAuthentication], getItemsProducts);

router.post(
  "/",
  [validateAuthentication, ...validateCreateProduct],
  createNewProduct
);

router.put(
  "/:id",
  [validateAuthentication, ...validateUpdateProduct],
  updateProduct
);

router.delete("/:id", [validateAuthentication], deleteProduct);

export { router };
