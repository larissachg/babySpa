export interface ProductInterface {
  IdProducto: number;
  Nombre: string;
  Descripcion: string;
  Precio: string;
  Costo: string;
  Estado: boolean;
  Categoria: "Servicio" | "ServicioMommy" | "Item";
}
