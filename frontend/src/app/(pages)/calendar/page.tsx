"use client";

import { getAppointments } from "@/actions/appointments";
import { Calendar } from "./(components)/Calendar";
import { Event } from "react-big-calendar";
import { FormAppointment } from "./(components)/FormAppointment";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const [appointments, setAppointments] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    const fetchedAppointments = await getAppointments();
    const events: Event[] = fetchedAppointments.map((appointment) => ({
      title: `${
        appointment.DatosClientes?.NombreBebe ?? "No hay datos aun"
      } - ${appointment.Productos?.Nombre}`,
      start: new Date(appointment.FechaInicio),
      end: new Date(appointment.FechaFin),
      allDay: false,
      resource: appointment,
    }));
    setAppointments(events);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <h1 className="font-bold text-6xl my-4 text-center">{loading && "Obteniendo datos..."}</h1>
      <Calendar appointments={appointments} />
      <FormAppointment refreshAppointments={fetchAppointments} />
    </>
  );
};

export default CalendarPage;
