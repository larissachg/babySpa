'use client'

import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  View,
  Views
} from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { es } from 'date-fns/locale/es'
import { useCallback, useState } from 'react'

const locales = {
  es: es
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    title: 'Cita Médica',
    start: new Date(),
    end: new Date(),
    allDay: false
  },
  {
    title: 'Reunión de trabajo',
    start: new Date('2024/10/10 10:30'),
    end: new Date('2024/10/10 12:30')
  }
]

const messages = {
  allDay: 'Todo el día',
  previous: 'Atrás',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: (total: number) => `+ Ver más (${total})`
}

export const Calendar = () => {
  const [view, setView] = useState<View>(Views.WEEK)

  const handleOnChangeView = (selectView: View) => {
    setView(selectView)
  }

  const [date, setDate] = useState(new Date())
  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate)
    },
    [setDate]
  )

  return (
    <div className='h-[90vh] mx-4 mt-3 sm:mx-0 sm:mt-0 sm:mr-4 lg:mx-5'>
      <BigCalendar
        culture='es'
        date={date}
        onNavigate={onNavigate}
        localizer={localizer}
        events={events}
        views={['month', 'week', 'day', 'agenda']}
        defaultView='week'
        showMultiDayTimes={true}
        toolbar={true}
        messages={messages}
        onView={handleOnChangeView}
        view={view}
        onSelectEvent={(event) => {
          console.log(event)
        }}
      />
    </div>
  )
}
