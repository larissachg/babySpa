"use client";

import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  View,
  Views,
  Event,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { es } from "date-fns/locale/es";
import { useCallback, useState } from "react"; 

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: "Todo el día",
  previous: "Atrás",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: (total: number) => `+ Ver más (${total})`,
};

interface CalendarProps {
  appointments: Event[];
}

export const Calendar = ({ appointments }: CalendarProps) => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const handleOnChangeView = (selectView: View) => {
    setView(selectView);
  };

  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate);
    },
    [setDate]
  );

  return (
    <div className="mt-5 relative">
      <div className="h-[83vh] ">
        <BigCalendar
          culture="es"
          date={date}
          onNavigate={onNavigate}
          localizer={localizer}
          events={appointments}
          views={["month", "week", "day", "agenda"]}
          defaultView="week"
          showMultiDayTimes={true}
          toolbar={true}
          messages={messages}
          onView={handleOnChangeView}
          view={view}
          onSelectEvent={(event) => {
            console.log(event);
          }}
        />
      </div> 
    </div>
  );
};
