import { Productos_Categoria } from "@prisma/client";

export interface ProductInterface {
  Nombre: string;
  Descripcion?: string;
  Precio: number;
  Costo: number;
  Categoria: Productos_Categoria;
  Estado?: boolean;
}