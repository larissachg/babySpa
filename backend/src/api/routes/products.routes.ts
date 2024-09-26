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
} from "../validator/product.validator";

const router = Router();

router.get("/", [], getProducts);

router.get("/active", [], getActiveProducts);

router.get("/service", [], getServiceProducts);

router.get("/items", [], getItemsProducts);

router.post("/", [...validateCreateProduct], createNewProduct);

router.put("/:id", [...validateUpdateProduct], updateProduct);

router.delete("/:id", deleteProduct);

export { router };
