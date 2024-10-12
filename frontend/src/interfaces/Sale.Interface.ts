export interface SaleInterface {
  IdVenta:        number;
  IdCliente:      number;
  Fecha:          Date;
  Total:          string;
  Comentario:     string;
  Estado:         boolean;
  VentasDetalles: VentasDetalle[];
  DatosClientes:  DatosClientes;
}

export interface DatosClientes {
  IdCliente:           number;
  NombreBebe:          string;
  FechaNac:            Date;
  SemanaNac:           number;
  Parto:               null;
  PesoNac:             null;
  PesoActual:          null;
  Genero:              string;
  NombreMama:          string;
  EdadMama:            null;
  NombrePapa:          string;
  EdadPapa:            null;
  Celular:             string;
  CodigoPais:          string;
  Email:               string;
  AutorizacionRrss:    null;
  UsuarioRrss:         null;
  ConocimientoBabySpa: null;
}

export interface VentasDetalle {
  Id:         number;
  IdProducto: number;
  IdVenta:    number;
  Cantidad:   number;
  Subtotal:   string;
}
