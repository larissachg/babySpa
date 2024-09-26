export interface VentaInterface {
  IdCliente?: number;
  Fecha: Date;
  Total: number;
  Comentario?: string;
}

export interface VentaDetalleInterface {
  IdProducto: number;
  IdVenta: number;
  Cantidad: number;
  Subtotal: number;
}

export interface VentaDataInterface{
  venta: VentaInterface;
  detalle: VentaDetalleInterface[];
}