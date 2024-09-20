import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClients = async () => {
  const products = await prisma.productos.findMany()

  return products;
};

