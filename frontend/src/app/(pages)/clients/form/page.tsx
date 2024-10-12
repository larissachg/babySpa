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
import { Switch } from "@/components/ui/switch";
import { ClientInterface } from "@/interfaces";

// Esquema de validación con Zod
const clientSchema = z.object({
  NombreBebe: z.string().min(2, { message: "El nombre del bebé es obligatorio y debe tener al menos 2 caracteres" }),
  FechaNac: z.date().optional().nullable(),
  Celular: z.string().optional(),
  CodigoPais: z.string().optional(),
  Email: z.string().email({ message: "Debe ser un email válido" }).optional(),
  NombreMama: z.string().optional(),
  EdadMama: z.string().optional(),
  NombrePapa: z.string().optional(),
  EdadPapa: z.string().optional(),
  AutorizacionRrss: z.boolean().optional(),
  DatosMedicos: z.object({
    DificultadNacer: z.string().optional(),
    EstimulacionPrevia: z.string().optional(),
    CentroEstimulacionPrevia: z.string().optional(),
    DiagnosticoAlteracion: z.string().optional(),
    EnfermedadDiagnosticada: z.string().optional(),
    MedicamentoReciente: z.string().optional(),
  }).optional(),
});

const RegisterClientForm = () => {
  const form = useForm<ClientInterface>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      NombreBebe: "",
      FechaNac: null,
      Celular: "",
      CodigoPais: "",
      Email: "",
      NombreMama: "",
      EdadMama: "",
      NombrePapa: "",
      EdadPapa: "",
      AutorizacionRrss: false,
      DatosMedicos: {
        DificultadNacer: "",
        EstimulacionPrevia: "",
        CentroEstimulacionPrevia: "",
        DiagnosticoAlteracion: "",
        EnfermedadDiagnosticada: "",
        MedicamentoReciente: "",
      },
    },
  });

  function onSubmit(values: ClientInterface) {
    console.log("Cliente registrado:", values);
  }

  return (
    <div className="w-[90vw] mx-auto border py-5 px-10 rounded-3xl shadow-sm mb-10">
      <h1 className="font-bold text-2xl my-4">Formulario de Clientes</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Nombre del Bebé */}
          <FormField
            control={form.control}
            name="NombreBebe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Bebé</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del bebé" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="FechaNac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Número de celular" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CodigoPais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de País</FormLabel>
                <FormControl>
                  <Input placeholder="Código del país" {...field} />
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
                  <Input type="email" placeholder="Correo electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="NombreMama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Madre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la madre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="EdadMama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edad de la Madre</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Edad de la madre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="NombrePapa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Padre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del padre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="EdadPapa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edad del Padre</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Edad del padre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Datos Médicos */}
          <div className="col-span-2">
            <FormLabel>Datos Médicos</FormLabel>
            <FormField
              control={form.control}
              name="DatosMedicos.DificultadNacer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dificultades al Nacer</FormLabel>
                  <FormControl>
                    <Input placeholder="Describa dificultades al nacer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DatosMedicos.EstimulacionPrevia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimulación Previa</FormLabel>
                  <FormControl>
                    <Input placeholder="Describa estimulación previa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DatosMedicos.DiagnosticoAlteracion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnóstico de Alteraciones</FormLabel>
                  <FormControl>
                    <Input placeholder="Describa diagnósticos de alteraciones" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DatosMedicos.EnfermedadDiagnosticada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enfermedades Diagnosticadas</FormLabel>
                  <FormControl>
                    <Input placeholder="Enfermedades diagnosticadas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DatosMedicos.MedicamentoReciente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicamentos Recientes</FormLabel>
                  <FormControl>
                    <Input placeholder="Medicamentos recientes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="AutorizacionRrss"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Autorización Redes Sociales</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-[200px]">
            Registrar Cliente
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterClientForm;
