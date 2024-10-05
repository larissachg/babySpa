import { PrismaClient } from "@prisma/client";
import { VentaDataInterface } from "../interfaces";

const prisma = new PrismaClient();

export const registerNewSale = async (data: VentaDataInterface) => {
  try {
    const newSale = await prisma.ventas.create({
      data: {
        ...data.venta,
        Fecha: new Date(data.venta.Fecha),
        VentasDetalles: {
          create: data.detalle.map((item) => ({
            ...item,
          })),
        },
      },
      include: {
        VentasDetalles: true,
      },
    });

    return newSale;
  } catch (error) {
    throw new Error(`Error al registrar la venta: ${error.message}`);
  }
};

export const getAllSales = async () => {
  try {
    const sales = await prisma.ventas.findMany({
      include: {
        VentasDetalles: true,
      },
    });

    return sales;
  } catch (error) {
    throw new Error(`Error al obtener las ventas: ${error.message}`);
  }
};

export const deleteSaleById = async (id: number) => {
  try {
    const deleteProduct = await prisma.ventas.update({
      where: {
        IdVenta: id,
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
