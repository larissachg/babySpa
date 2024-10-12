'use client'

import { ColumnDef, FilterFn, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SaleInterface } from '@/interfaces'
import { EditButton, ViewButton } from '@/components/layout'

const myCustomFilterFn: FilterFn<SaleInterface> = (
  row: Row<SaleInterface>,
  IdVenta: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase()

  const filterParts = filterValue.split(' ')
  const rowValues =
    `${row.original.IdCliente} ${row.original.Comentario} ${row.original.Fecha} ${row.original.Total}`.toLowerCase()

  return filterParts.every((part) => rowValues.includes(part))
}

export const columns: ColumnDef<SaleInterface>[] = [
  {
    accessorKey: 'Cliente',
    filterFn: myCustomFilterFn,
    header: 'Cliente',
    cell: ({ row }) => <div>{row.original.DatosClientes?.NombreBebe}</div>
  },
  {
    accessorKey: 'Mama',
    filterFn: myCustomFilterFn,
    header: 'Mama',
    cell: ({ row }) => <div>{row.original.DatosClientes?.NombreMama}</div>
  },
  {
    accessorKey: 'Fecha',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dateValue = row.getValue('Fecha')

      const parsedDate = Date.parse(dateValue as string)
      if (!isNaN(parsedDate)) {
        const date = new Date(parsedDate)

        const formattedDate = new Intl.DateTimeFormat('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(date)

        return <div>{formattedDate}</div>
      }

      return <div>Fecha no válida</div>
    }
  },
  {
    accessorKey: 'Total',
    header: () => <div>Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('Total'))

      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'BOB'
      }).format(amount)

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: 'Comentario',
    header: 'Comentario',
    cell: ({ row }) => (
      <div className='camelcase'>{row.getValue('Comentario')}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className='text-end'>
          <ViewButton id={data.IdVenta} ruta='/sales/form' />
          <EditButton id={data.IdVenta} ruta='/sales/form' />
        </div>
      )
    }
  }
]
