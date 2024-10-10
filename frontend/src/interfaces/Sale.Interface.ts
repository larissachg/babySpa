export interface SaleInterface {
  IdVenta: number;
  IdCliente: null;
  Fecha: Date;
  Total: string;
  Comentario: string;
  Estado: boolean;
  VentasDetalles: [];
}
