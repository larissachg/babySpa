import { Citas_Estado } from "@prisma/client";

export interface AppointmentInterface {
  IdCliente?: number;
  Fecha: Date;
  Estado: Citas_Estado;
  IdProducto: number;
  Fisioterapeuta?: string;
  Observacion?: string;
}
