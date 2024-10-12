'use client'

import { ColumnDef, FilterFn, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ClientInterface } from '@/interfaces'
import { EditButton, ViewButton } from '@/components/layout'

const myCustomFilterFn: FilterFn<ClientInterface> = (
  row: Row<ClientInterface>,
  IdCliente: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase()

  const filterParts = filterValue.split(' ')
  const rowValues =
    `${row.original.IdCliente} ${row.original.NombreBebe} ${row.original.Genero} ${row.original.NombreMama} ${row.original.FechaNac}`.toLowerCase()

  return filterParts.every((part) => rowValues.includes(part))
}

export const columns: ColumnDef<ClientInterface>[] = [
  {
    accessorKey: 'IdCliente',
    header: 'IdCliente',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('IdCliente')}</div>
    )
  },
  {
    accessorKey: 'NombreBebe',
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre de Bebé
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('NombreBebe')}</div>
    )
  },
  {
    accessorKey: 'FechaNac',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha de Nacimiento <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dateValue = row.getValue('FechaNac')

      if (dateValue && typeof dateValue === 'string') {
        const parsedDate = Date.parse(dateValue)

        if (!isNaN(parsedDate)) {
          const date = new Date(parsedDate)

          const formattedDate = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(date)

          return <div>{formattedDate}</div>
        }
      }

      return <div className='font-medium'>Fecha no válida</div>
    }
  },
  {
    accessorKey: 'Genero',
    header: 'Genero',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('Genero')}</div>
    )
  },
  {
    accessorKey: 'NombreMama',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre de Mamá
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('NombreMama')}</div>
    )
  },
  {
    accessorKey: 'Celular',
    header: 'Celular',
    cell: ({ row }) => <div>{row.getValue('Celular')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className='text-end'>
          <ViewButton id={data.IdCliente} ruta='/clients/form' />
          <EditButton id={data.IdCliente} ruta='/clients/form' />
        </div>
      )
    }
  }
]
