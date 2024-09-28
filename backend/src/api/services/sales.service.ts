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

// export const updateSaleById = async (id: number, data: VentaDataInterface) => {
//   try {
//     const updateSale = await prisma.ventas.update({
//       where: {
//         IdVenta: id,
//       },
//       data: {
//         ...data,
//         Fecha: new Date(data.venta.Fecha),
//         VentasDetalles: {
//           update: {data: data.detalle},
//         }
//       },
//     });

//     return updateSale;
//   } catch (error) {
//     throw new Error(`Error al actualizar la venta: ${error.message}`);
//   }
// };

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
