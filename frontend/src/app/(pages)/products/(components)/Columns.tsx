'use client'

import { ColumnDef, FilterFn, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductInterface } from '@/interfaces'
import { EditButton, ViewButton } from '@/components/layout'

const myCustomFilterFn: FilterFn<ProductInterface> = (
  row: Row<ProductInterface>,
  IdProducto: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase()

  const filterParts = filterValue.split(' ')
  const rowValues =
    `${row.original.Nombre} ${row.original.Categoria} ${row.original.Precio} ${row.original.Descripcion}`.toLowerCase()

  return filterParts.every((part) => rowValues.includes(part))
}

export const columns: ColumnDef<ProductInterface>[] = [
  {
    accessorKey: 'Categoria',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categoría
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('Categoria')}</div>
    )
  },
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
    accessorKey: 'Descripcion',
    header: 'Descripción',
    cell: ({ row }) => <div>{row.getValue('Descripcion')}</div>
  },
  {
    accessorKey: 'Precio',
    header: 'Precio',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('Precio'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'BOB'
      }).format(amount)

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: 'Costo',
    header: 'Costo',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('Costo'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'BOB'
      }).format(amount)

      return <div>{formatted}</div>
    }
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
          {estado ? 'Disponible' : 'No Disponible'}
        </div>
      )
    }
  },
  {
    id: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className='text-end'>
          <ViewButton id={data.IdProducto} ruta='/products/form' />
          <EditButton id={data.IdProducto} ruta='/products/form' />
        </div>
      )
    }
  }
]
