export interface AppointmentInterface {
  IdCita: number;
  IdCliente: number;
  FechaInicio: Date;
  FechaFin: Date;
  Estado: "Agendado" | "Realizado" | "Cancelado" | "NoAsistio";
  IdProducto: number;
  Fisioterapeuta: string;
  Observacion: string;
  DatosClientes?: DatosClientes;
  Productos?: Productos;
}

export interface DatosClientes {
  IdCliente: number;
  NombreBebe: string;
  FechaNac: Date;
  SemanaNac: number;
  Parto: "Natural" | "Cesarea";
  PesoNac: number;
  PesoActual: number;
  Genero: "Femenino" | "Masculino";
  NombreMama: string;
  EdadMama: number;
  NombrePapa: string;
  EdadPapa: number;
  Celular: number;
  CodigoPais: number;
  Email: string;
  AutorizacionRrss: boolean;
  UsuarioRrss: string;
  ConocimientoBabySpa: string;
}

export interface Productos {
  IdProducto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Costo: number;
  Estado: boolean;
  Categoria: "Servicio" | "ServicioMommy" | "Item";
}
