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
import { ClientInterface } from "@/interfaces";

const myCustomFilterFn: FilterFn<ClientInterface> = (
  row: Row<ClientInterface>,
  IdCliente: string,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.IdCliente} ${row.original.NombreBebe} ${row.original.Genero} ${row.original.NombreMama} ${row.original.FechaNac}`.toLowerCase();

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<ClientInterface>[] = [
  {
    accessorKey: "IdCliente",
    header: "IdCliente",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("IdCliente")}</div>
    ),
  },
  {
    accessorKey: "NombreBebe",
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de Bebé
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("NombreBebe")}</div>
    ),
  },
  {
    accessorKey: "FechaNac",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Nacimiento <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue = row.getValue("FechaNac");

      if (dateValue && typeof dateValue === "string") {
        const parsedDate = Date.parse(dateValue);

        if (!isNaN(parsedDate)) {
          const date = new Date(parsedDate);

          const formattedDate = new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(date);

          return <div className="font-medium">{formattedDate}</div>;
        }
      }

      return <div className="font-medium">Fecha no válida</div>;
    },
  },
  {
    accessorKey: "Genero",
    header: "Genero",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Genero")}</div>
    ),
  },
  {
    accessorKey: "NombreMama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de Mamá
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("NombreMama")}</div>
    ),
  },
  {
    accessorKey: "Celular",
    header: "Celular",
    cell: ({ row }) => <div>{row.getValue("Celular")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;

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
                navigator.clipboard.writeText(client.IdCliente.toString())
              }
            >
              Ficha de cliente
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
