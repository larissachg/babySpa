"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ProductInterface } from "@/interfaces";

const productSchema = z.object({
  Nombre: z.string().min(2, { message: "El nombre es obligatorio y debe tener al menos 2 caracteres" }),
  Descripcion: z.string().optional(),
  Precio: z.string().min(1, { message: "El precio es obligatorio" }),
  Costo: z.string().min(1, { message: "El costo es obligatorio" }),
  Estado: z.boolean().default(true),
  Categoria: z.enum(["Servicio", "ServicioMommy", "Item"], { message: "Debe seleccionar una categoría válida" }),
});

const RegisterProductForm = () => {
  const form = useForm<ProductInterface>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      Nombre: "",
      Descripcion: "",
      Precio: "",
      Costo: "",
      Estado: true,
      Categoria: "Item", 
    },
  });

  function onSubmit(values: ProductInterface) {
    console.log("Producto registrado:", values);
  }

  return (
    <div className="w-[70vw] md:w-[40vw] mx-auto border py-5 px-10 rounded-3xl shadow-sm mb-10">
      <h1 className="font-bold text-2xl my-4">Formulario de Producto</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="Nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Producto</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa el nombre del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Descripcion"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción del producto (opcional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Precio del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Costo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Costo del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Servicio">Servicio</option>
                    <option value="ServicioMommy">Servicio Mommy</option>
                    <option value="Item">Item</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Estado"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Estado Activo</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-[200px] mt-5">
            Registrar Producto
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterProductForm;
