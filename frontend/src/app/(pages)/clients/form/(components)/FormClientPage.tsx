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
import { ClientInterface } from "@/interfaces";
import { Switch } from "@/components/ui/switch";
import { registerClient, updateClient } from "@/actions/clients";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Esquema de validación con Zod
const clientSchema = z.object({
  NombreBebe: z.string().min(2, {
    message:
      "El nombre del bebé es obligatorio y debe tener al menos 2 caracteres",
  }),
  FechaNac: z.date(),
  Celular: z.number(),
  CodigoPais: z.number(),
  Email: z.string().email({ message: "Debe ser un email válido" }).optional(),
  NombreMama: z.string().optional(),
  EdadMama: z.number().optional(),
  NombrePapa: z.string().optional(),
  EdadPapa: z.number().optional(),
  AutorizacionRrss: z.boolean().optional(),
  DatosMedicos: z.object({
    DificultadNacer: z.string().optional(),
    EstimulacionPrevia: z.string().optional(),
    CentroEstimulacionPrevia: z.string().optional(),
    DiagnosticoAlteracion: z.string().optional(),
    EnfermedadDiagnosticada: z.string().optional(),
    MedicamentoReciente: z.string().optional(),
  }),
  DatosPrimeraEvaluciacion: z.object({
    Visual: z.enum(["Sigue", "NoSigue"]),
    ContactoVisual: z.enum(["Si", "No"]),
    Auditivo: z.enum(["Sigue", "NoSigue"]),
    Musculatura: z.enum(["Bajo", "Normal", "Tension"]),
    ControlCervical: z.enum(["Si", "No"]),
    CabezaAlzada: z.enum(["Si", "No"]),
    Sentado: z.enum(["Si", "No"]),
    Gateo: z.enum(["Si", "No"]),
    Caminar: z.enum(["Si", "No"]),
    EstadoAnimo: z.enum(["Tranquilo", "Irritable"]),
  }),
});

const defaultValue: ClientInterface = {
  NombreBebe: "",
  FechaNac: new Date(),
  Celular: 0,
  CodigoPais: 0,
  Email: "",
  NombreMama: "",
  EdadMama: 0,
  NombrePapa: "",
  EdadPapa: 0,
  AutorizacionRrss: false,
  ConocimientoBabySpa: "",
  Genero: "Femenino",
  Parto: "Natural",
  PesoActual: 0,
  PesoNac: 0,
  SemanaNac: 0,
  UsuarioRrss: "",
  DatosMedicos: {
    DificultadNacer: "",
    EstimulacionPrevia: "",
    CentroEstimulacionPrevia: "",
    DiagnosticoAlteracion: "",
    EnfermedadDiagnosticada: "",
    MedicamentoReciente: "",
  },
  DatosPrimeraEvaluciacion: {
    Visual: "Sigue",
    ContactoVisual: "Si",
    Auditivo: "Sigue",
    Musculatura: "Normal",
    ControlCervical: "Si",
    CabezaAlzada: "Si",
    Sentado: "Si",
    Gateo: "Si",
    Caminar: "Si",
    EstadoAnimo: "Tranquilo",
  },
};

interface FormClientPageProps {
  data?: ClientInterface;
  type?: "view" | "update";
}

const FormClientPage = ({ data, type }: FormClientPageProps) => {
  const form = useForm<ClientInterface>({
    resolver: zodResolver(clientSchema),
    defaultValues: data ?? defaultValue,
  });

  const [formError, setFormError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: ClientInterface) {
    const response =
      type === "update" && data?.IdCliente
        ? await updateClient(values, data.IdCliente.toString())
        : await registerClient(values);

    if (!response) return setFormError("Error al registrar el cliente");
    if (response.errors) return setFormError(`${response.errors[0].msg}`);
    toast({
      variant: "success",
      description: `¡Cliente ${
        type === "update" ? "actualizado" : "registrado"
      } exitosamente!`,
    });
    return router.push("/clients");
  }

  return (
    <div className="mx-auto border py-5 sm:px-10 rounded-3xl shadow-sm mb-10">
      <h1 className="font-bold text-2xl my-4 text-[var(--blue)] text-center">
        Formulario de Clientes
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[70vw] flex flex-col gap-5 justify-center items-center mx-auto"
        >
          <Tabs defaultValue="client" className="w-full px-3">
            <TabsList className="bg-[var(--blue)] opacity-80 text-white flex gap-1 w-max mx-auto">
              <TabsTrigger value="DatosClientes" className="font-bold p-1">
                Datos Cliente
              </TabsTrigger>
              <TabsTrigger value="DatosMedicos" className="font-bold p-1">
                Datos Medicos
              </TabsTrigger>
              <TabsTrigger
                value="DatosPrimeraEvaluacion"
                className="font-bold p-1"
              >
                Primera Evaluacion
              </TabsTrigger>
            </TabsList>
            <TabsContent value="DatosClientes">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center my-5 text-slate-700">
                <FormField
                  control={form.control}
                  name="NombreBebe"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Nombre del Bebé
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese nombre completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Género</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Femenino
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Masculino
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="FechaNac"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 mt-2">
                      <FormLabel className="font-bold">
                        Fecha de nacimiento
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="SemanaNac"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Semana de nacimiento
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="PesoNac"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Peso de nacimiento
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="PesoActual"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Peso Actual</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Parto"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-bold">
                        Forma de parto
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Natural" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Natural
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Cesarea" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Cesarea
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5 border-t pt-5 text-slate-700">
                <FormField
                  control={form.control}
                  disabled={type === "view"}
                  name="NombreMama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Nombre de la mamá
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese nombre y apellido"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="NombrePapa"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Nombre del papá
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese nombre y apellido"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="EdadMama"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Edad de la mamá
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="EdadPapa"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Edad del papá</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Celular"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Celular</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Número de celular"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  disabled={type === "view"}
                  name="CodigoPais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Código de País
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Código del país" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  disabled={type === "view"}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Correo electrónico"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ConocimientoBabySpa"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 mt-1">
                      <FormLabel className="font-bold">
                        Conocimiento de Baby Spa
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Cómo se enteró de nosotros?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="AutorizacionRrss"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel className="font-bold">
                        Autorización Redes Sociales
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="UsuarioRrss"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel className="font-bold">
                        Usuario de Redes Sociales
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Usuario de instagram"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {formError && (
                <p className="text-red-500 text-sm mt-2">{formError}</p>
              )}

              {type !== "view" && (
                <Button type="submit" className="w-[200px] mt-3">
                  Guardar
                </Button>
              )}
            </TabsContent>

            <TabsContent value="DatosMedicos">
              <div className="text-slate-700 flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="DatosMedicos.DificultadNacer"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Dificultades al Nacer
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describa si existieron dificultades al nacer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="DatosMedicos.EstimulacionPrevia"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Estimulación Previa
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describa si existio estimulación previa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="DatosMedicos.DiagnosticoAlteracion"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Diagnóstico de Alteraciones
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describa si existe diagnósticos de alteraciones"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="DatosMedicos.EnfermedadDiagnosticada"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Enfermedades Diagnosticadas
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describa si existe enfermedades diagnosticadas"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="DatosMedicos.MedicamentoReciente"
                  disabled={type === "view"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Medicamentos Recientes
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describa si existe medicamentos recientes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {formError && (
                <p className="text-red-500 text-sm mt-2">{formError}</p>
              )}

              {type !== "view" && (
                <Button type="submit" className="w-[200px] mt-3">
                  Guardar
                </Button>
              )}
            </TabsContent>

            <TabsContent value="DatosPrimeraEvaluacion">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center my-5 text-slate-700">
                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.Visual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Visual</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Sigue" />
                            </FormControl>
                            <FormLabel>Sigue</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="NoSigue" />
                            </FormControl>
                            <FormLabel>No Sigue</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.ContactoVisual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Contacto Visual
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Si" />
                            </FormControl>
                            <FormLabel>Si</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel>No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.Auditivo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Auditivo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Sigue" />
                            </FormControl>
                            <FormLabel>Sigue</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="NoSigue" />
                            </FormControl>
                            <FormLabel>No Sigue</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.Musculatura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Musculatura</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Bajo" />
                            </FormControl>
                            <FormLabel>Bajo</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Normal" />
                            </FormControl>
                            <FormLabel>Normal</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Tension" />
                            </FormControl>
                            <FormLabel>Tension</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.ControlCervical"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Control Cervical
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Si" />
                            </FormControl>
                            <FormLabel>Si</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel>No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.CabezaAlzada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Cabeza alzada</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Si" />
                            </FormControl>
                            <FormLabel>Si</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel>No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.Sentado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Sentado</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Si" />
                            </FormControl>
                            <FormLabel>Si</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel>No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.Gateo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Gateo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Si" />
                            </FormControl>
                            <FormLabel>Si</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel>No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.Caminar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Caminar</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Si" />
                            </FormControl>
                            <FormLabel>Si</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel>No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="DatosPrimeraEvaluciacion.EstadoAnimo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Estado de animo
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Tranquilo" />
                            </FormControl>
                            <FormLabel>Tranquilo</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Irritable" />
                            </FormControl>
                            <FormLabel>Irritable</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {formError && (
                <p className="text-red-500 text-sm mt-2">{formError}</p>
              )}

              {type !== "view" && (
                <Button type="submit" className="w-[200px] mt-3">
                  Guardar
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default FormClientPage;
