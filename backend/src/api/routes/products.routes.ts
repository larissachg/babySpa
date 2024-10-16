import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getActiveProducts,
  getItemsProducts,
  getMommyServiceProducts,
  getProduct,
  getProducts,
  getServiceProducts,
  updateProduct,
} from "../controllers";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../validator";
import { validateAuthentication } from "../middleware/auth";

const router = Router();

router.get("/", [validateAuthentication], getProducts);
router.get("/:id", [validateAuthentication], getProduct);

router.get("/active", [validateAuthentication], getActiveProducts);

router.get("/service", [validateAuthentication], getServiceProducts);

router.get("/items", [validateAuthentication], getItemsProducts);

router.get("/mommy", [validateAuthentication], getMommyServiceProducts);

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
