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
import { ProductInterface } from "@/interfaces";

const myCustomFilterFn: FilterFn<ProductInterface> = (
  row: Row<ProductInterface>,
  IdProducto: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.Nombre} ${row.original.Categoria} ${row.original.Precio} ${row.original.Descripcion}`.toLowerCase();

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<ProductInterface>[] = [
  {
    accessorKey: "Categoria",
    header: "Categoría",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Categoria")}</div>
    ),
  },
  {
    accessorKey: "Nombre",
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Nombre")}</div>
    ),
  },
  {
    accessorKey: "Descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="normal-case">{row.getValue("Descripcion")}</div>
    ),
  },
  {
    accessorKey: "Precio",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Precio"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "BOB",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Costo",
    header: () => <div className="text-right">Costo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Costo"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "BOB",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ver</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.IdProducto.toString())
              }
            >
              Detalle de producto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
