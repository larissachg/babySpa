'use client'

import { ColumnDef, FilterFn, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserInterface } from '@/interfaces'
import { EditButton, ViewButton } from '@/components/layout'

const myCustomFilterFn: FilterFn<UserInterface> = (
  row: Row<UserInterface>,
  IdUsuario: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase()

  const filterParts = filterValue.split(' ')
  const rowValues =
    `${row.original.IdUsuario} ${row.original.Nombre} ${row.original.Rol} ${row.original.Usuario} ${row.original.Email}`.toLowerCase()

  return filterParts.every((part) => rowValues.includes(part))
}

export const columns: ColumnDef<UserInterface>[] = [
  {
    accessorKey: 'Nombre',
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('Nombre')}</div>
    )
  },
  {
    accessorKey: 'Usuario',
    header: 'Usuario',
    cell: ({ row }) => (
      <div className='normal-case'>{row.getValue('Usuario')}</div>
    )
  },
  {
    accessorKey: 'Email',
    header: 'Email',
    cell: ({ row }) => (
      <div className='normal-case'>{row.getValue('Email')}</div>
    )
  },
  {
    accessorKey: 'Rol',
    header: 'Rol',
    cell: ({ row }) => <div className='normal-case'>{row.getValue('Rol')}</div>
  },
  {
    accessorKey: 'Estado',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const estado = row.getValue('Estado') as boolean

      return (
        <div className='capitalize'>
          {estado ? 'Activo' : 'Desactivado'}
        </div>
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,

    cell: ({ row }) => {
      const data = row.original
      return (
        <div className='text-end'>
          <ViewButton id={data.IdUsuario} ruta='/users/form' />
          <EditButton id={data.IdUsuario} ruta='/users/form' />
        </div>
      )
    }
  }
]
