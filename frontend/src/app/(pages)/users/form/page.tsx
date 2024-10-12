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
import { UserInterface } from "@/interfaces";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  Nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  Email: z.string().email({ message: "Debe ser un email válido" }),
  Usuario: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  Password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  Rol: z.enum(["admin", "user"], { message: "Debe seleccionar un rol válido" }),
  Estado: z.boolean().default(true),
});

const FormUserPage = () => {
  const form = useForm<UserInterface>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Nombre: "",
      Email: "",
      Usuario: "",
      Password: "",
      Rol: "user",
      Estado: true,
    },
  });

  function onSubmit(values: UserInterface) {
    console.log(values);
  }

  return (
    <div className="w-[70vw] md:w-[40vw] mx-auto border py-5 px-10 rounded-3xl shadow-sm mb-10">
      <h1 className="font-bold text-2xl my-4">Formulario de Usuario</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="Nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Usuario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rol */}
          <FormField
            control={form.control}
            name="Rol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">Caja</option>
                    <option value="user">Fisio</option>
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
                <FormLabel>Activo</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-[200px] mt-3">
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormUserPage;
