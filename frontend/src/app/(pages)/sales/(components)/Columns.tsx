"use client";

import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SaleInterface } from "@/interfaces";

const myCustomFilterFn: FilterFn<SaleInterface> = (
  row: Row<SaleInterface>,
  IdCliente: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.IdCliente} ${row.original.Comentario} ${row.original.Fecha} ${row.original.Total}`.toLowerCase();

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<SaleInterface>[] = [
  {
    accessorKey: "IdCliente",
    filterFn: myCustomFilterFn,
    header: "IdCliente",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("IdCliente")}</div>
    ),
  },
  {
    accessorKey: "Fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue = row.getValue("Fecha");

      const parsedDate = Date.parse(dateValue as string);
      if (!isNaN(parsedDate)) {
        const date = new Date(parsedDate);

        const formattedDate = new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);

        return <div>{formattedDate}</div>;
      }

      return <div className="font-medium">Fecha no válida</div>;
    },
  },
  {
    accessorKey: "Total",
    header: () => <div>Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Total"));

      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "BOB",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Comentario",
    header: "Comentario",
    cell: ({ row }) => (
      <div className="normal-case">{row.getValue("Comentario")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const sale = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ver</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(sale.IdVenta.toString())
              }
            >
              Detalle de venta
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
