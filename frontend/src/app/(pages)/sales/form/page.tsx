"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SaleInterface } from "@/interfaces";

// Crear el esquema de validación con zod
const saleSchema = z.object({
  IdCliente: z.number().min(1, { message: "Debe seleccionar un cliente" }),
  Fecha: z.date(),
  Total: z.string().min(1, { message: "El total es obligatorio" }),
  Comentario: z.string().optional(),
  Estado: z.boolean().default(true),
  VentasDetalles: z
    .array(
      z.object({
        IdProducto: z.number().min(1, { message: "Debe seleccionar un producto" }),
        Cantidad: z.number().min(1, { message: "La cantidad debe ser mayor a 0" }),
        Subtotal: z.string().min(1, { message: "El subtotal es obligatorio" }),
      })
    )
    .min(1, { message: "Debe agregar al menos un producto" }),
});

const RegisterSaleForm = () => {
  const form = useForm<SaleInterface>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      IdCliente: 0,
      Fecha: new Date(),
      Total: "",
      Comentario: "",
      Estado: true,
      VentasDetalles: [{ IdProducto: 0, Cantidad: 1, Subtotal: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "VentasDetalles",
  });

  function onSubmit(values: SaleInterface) {
    console.log("Venta registrada:", values);
  }

  return (
    <div className="w-[70vw] md:w-[40vw] mx-auto border py-5 px-10 rounded-3xl shadow-sm mb-10">
      <h1 className="font-bold text-2xl my-4">Formulario de Venta</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* IdCliente */}
          <FormField
            control={form.control}
            name="IdCliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente (ID)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="ID del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha */}
          <FormField
            control={form.control}
            name="Fecha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de la Venta</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total */}
          <FormField
            control={form.control}
            name="Total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Total de la venta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comentario */}
          <FormField
            control={form.control}
            name="Comentario"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea placeholder="Comentario adicional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estado */}
          <FormField
            control={form.control}
            name="Estado"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* VentasDetalles */}
          <div className="col-span-2">
            <FormLabel>Detalles de la Venta</FormLabel>
            {fields.map((item, index) => (
              <div key={item.IdProducto} className="flex space-x-4 mb-4">
                <FormField
                  control={form.control}
                  name={`VentasDetalles.${index}.IdProducto`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Producto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ID del producto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`VentasDetalles.${index}.Cantidad`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Cantidad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`VentasDetalles.${index}.Subtotal`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtotal</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Subtotal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="self-end"
                >
                  Eliminar
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ IdProducto: 0, Cantidad: 1, Subtotal: "" })}
            >
              Añadir Producto
            </Button>
          </div>

          {/* Botón de enviar */}
          <Button type="submit" className="w-full col-span-2">
            Registrar Venta
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterSaleForm;
