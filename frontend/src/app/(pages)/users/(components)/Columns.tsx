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
import { UserInterface } from "@/interfaces";

const myCustomFilterFn: FilterFn<UserInterface> = (
  row: Row<UserInterface>,
  IdUsuario: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.IdUsuario} ${row.original.Nombre} ${row.original.Rol} ${row.original.Usuario} ${row.original.Email}`.toLowerCase();

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<UserInterface>[] = [
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
    accessorKey: "Usuario",
    header: "Usuario",
    cell: ({ row }) => (
      <div className="normal-case">{row.getValue("Usuario")}</div>
    ),
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => (
      <div className="normal-case">{row.getValue("Email")}</div>
    ),
  },
  {
    accessorKey: "Rol",
    header: "Rol",
    cell: ({ row }) => <div className="normal-case">{row.getValue("Rol")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
                navigator.clipboard.writeText(payment.IdUsuario.toString())
              }
            >
              Datos de Usuario
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
