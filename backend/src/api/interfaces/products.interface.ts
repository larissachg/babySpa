import { Productos_Categoria } from "@prisma/client";

export interface ProductInterface {
  Nombre: string;
  Descripcion?: string;
  Precio: number;
  Costo: number;
  EsServicio?: boolean;
  Categoria: Productos_Categoria;
}
