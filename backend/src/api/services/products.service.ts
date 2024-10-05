import { PrismaClient } from "@prisma/client";
import { ProductInterface } from "../interfaces";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  try {
    const products = await prisma.productos.findMany();

    return products;
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }
};

export const getProductsByActiveStatus = async () => {
  try {
    const activeProducts = await prisma.productos.findMany({
      where: {
        Estado: true,
      },
    });

    return activeProducts;
  } catch (error) {
    throw new Error(`Error al obtener los productos activos: ${error.message}`);
  }
};

export const getProductsByService = async () => {
  try {
    const serviceProducts = await prisma.productos.findMany({
      where: {
        Categoria: "Servicio",
        Estado: true,
      },
    });

    return serviceProducts;
  } catch (error) {
    throw new Error(
      `Error al obtener los productos que son servicios: ${error.message}`
    );
  }
};

export const getProductsByItems = async () => {
  try {
    const itemsProducts = await prisma.productos.findMany({
      where: {
        Categoria: "Item",
        Estado: true,
      },
    });

    return itemsProducts;
  } catch (error) {
    throw new Error(
      `Error al obtener los productos que son items: ${error.message}`
    );
  }
};

export const createProduct = async (data: ProductInterface) => {
  try {
    const newProduct = await prisma.productos.create({
      data,
    });
    return newProduct;
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

export const updateProductById = async (id: number, data: ProductInterface) => {
  try {
    const updateProduct = await prisma.productos.update({
      where: {
        IdProducto: id,
      },
      data,
    });
    return updateProduct;
  } catch (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};

export const deleteProductById = async (id: number) => {
  try {
    const deleteProduct = await prisma.productos.update({
      where: {
        IdProducto: id,
      },
      data: {
        Estado: false,
      },
    });
    return deleteProduct;
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};
