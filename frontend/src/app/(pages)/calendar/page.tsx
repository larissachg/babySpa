import { getAppointments } from "@/actions/appointments";
import { Calendar } from "./(components)/Calendar";
import { Event } from "react-big-calendar";

const page = async () => {
  const appointments = await getAppointments();

  const events: Event[] = appointments.map((appointment) => ({
    title: `${appointment.DatosClientes?.NombreBebe ?? "No hay datos aun"} - ${
      appointment.Productos?.Nombre
    }`,
    start: new Date(appointment.FechaInicio),
    end: new Date(appointment.FechaFin),
    allDay: false,
    resource: appointment,
  }));

  return <Calendar appointments={events} />;
};

export default page;
