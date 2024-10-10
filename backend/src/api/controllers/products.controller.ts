import { Request, Response } from "express";

import { ProductInterface } from "../interfaces";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductsByActiveStatus,
  getProductsByItems,
  getProductsByMommyService,
  getProductsByService,
  updateProductById,
} from "../services";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200);
    res.json({
      success: true,
      message: "Productos obtenidos con exito",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getActiveProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const activeProducts = await getProductsByActiveStatus();

    res.status(200);
    res.json({
      success: true,
      message: "Productos activos obtenidos con exito",
      data: activeProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getServiceProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceProducts = await getProductsByService();

    res.status(200);
    res.json({
      success: true,
      message: "Productos de servicio obtenidos con exito",
      data: serviceProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getItemsProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const itemsProducts = await getProductsByItems();

    res.status(200);
    res.json({
      success: true,
      message: "Productos de items obtenidos con exito",
      data: itemsProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getMommyServiceProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const mommyProducts = await getProductsByMommyService();

    res.status(200);
    res.json({
      success: true,
      message: "Productos de mommy service obtenidos con exito",
      data: mommyProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const createNewProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productData: ProductInterface = req.body;

    const newProduct = await createProduct(productData);

    res.status(201).json({
      success: true,
      message: "Producto creado con éxito",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al crear producto" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const productData: ProductInterface = req.body;

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "El ID del producto no es válido",
      });
    }

    const modifyProduct = await updateProductById(id, productData);

    res.status(201).json({
      success: true,
      message: "Producto actualizado con éxito",
      data: modifyProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "El ID del producto no es válido",
      });
    }

    const removeProduct = await deleteProductById(id);

    res.status(201).json({
      success: true,
      message: "Producto desactivado con éxito",
      data: removeProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al desactivar el producto" });
  }
};
