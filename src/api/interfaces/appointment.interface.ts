import { Cita_Estado } from "@prisma/client";

export interface AppointmentInterface {
  IdCliente?: number;
  Fecha: Date;
  Estado: Cita_Estado;
  IdProducto: number;
  Fisioterapeuta?: string;
  Observacion?: string;
}
