"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppointmentInterface } from "@/interfaces";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAppointment } from "@/actions/appointments";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, setHours, setMinutes } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const appointmentSchema = z.object({
  IdCliente: z.number().positive("El ID de cliente es requerido"),
  FechaInicio: z.date(),
  FechaFin: z.date(),
  Estado: z.enum(["Agendado", "Realizado", "Cancelado", "NoAsistio"]),
  IdProducto: z.number().positive("El ID de producto es requerido"),
  Fisioterapeuta: z.string().optional(),
  Observacion: z.string().optional(),
});

const defaultValue: AppointmentInterface = {
  IdCita: 0,
  IdCliente: 0,
  FechaInicio: new Date(),
  FechaFin: new Date(),
  Estado: "Agendado",
  IdProducto: 0,
  Fisioterapeuta: "",
  Observacion: "",
};

interface FormAppointmentProps {
  data?: AppointmentInterface;
  //   type?: "new" | "update";
}

export const FormAppointment = ({ data }: FormAppointmentProps) => {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("09:00");

  const form = useForm<AppointmentInterface>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: data ?? defaultValue,
  });

  const [formError, setFormError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(data: any) {

    const startTime = setHours(
      setMinutes(selectedDate ?? new Date(), parseInt(selectedTime.split(":")[1])),
      parseInt(selectedTime.split(":")[0])
    );
    const endTime = setHours(
      setMinutes(startTime, parseInt(selectedTime.split(":")[1]) + 60),
      parseInt(selectedTime.split(":")[0])
    );

    const appointmentData = {
      ...data,
      FechaInicio: startTime,
      FechaFin: endTime,
    };

    const response = await registerAppointment(appointmentData);

    if (!response) return setFormError("Error al registrar la cita");
    if (response.errors) return setFormError(`${response.errors[0].msg}`);
    toast({
      variant: "success",
      description: "Cita registrada exitosamente!",
    });
    return router.push("/appointments");
  }

  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="absolute bottom-[15px] right-[10px] sm:right-[20px] rounded-full lg:text-[30px] md:h-[50px] md:w-[50px] lg:w-[65px] lg:h-[65px] shadow-[4px_6px_7px_1px_rgba(0,0,0,0.3)]">
                +
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">Agregar Cita</TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Cita</DialogTitle>
            <DialogDescription>
              Llena los datos para Agendar una cita.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="IdCliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="ID del Cliente"
                        />
                      </FormControl>
                      {form.formState.errors.IdCliente && (
                        <span className="text-red-500">
                          El cliente es requerido
                        </span>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="FechaInicio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha y Hora de Inicio</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="datetime-local"
                          value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      {form.formState.errors.FechaInicio && (
                        <span className="text-red-500">
                          El cliente es requerido
                        </span>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Fecha y hora de inicio */}
              <div className="col-span-2">
                <label>Fecha y Hora de Inicio</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Seleccionar Fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="mt-2">
                  <label>Hora</label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

                <FormField
                  control={form.control}
                  name="IdProducto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Producto</FormLabel>
                      <Input
                        type="number"
                        placeholder="ID del Producto"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Agendado"
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Agendado">Agendado</SelectItem>
                          <SelectItem value="Realizado">Realizado</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                          <SelectItem value="NoAsistio">No Asistió</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.Estado && (
                        <span className="text-red-500">
                          El estado es requerido
                        </span>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Fisioterapeuta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fisioterapeuta</FormLabel>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Nombre del Fisioterapeuta"
                        />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Observacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones</FormLabel>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Observaciones"
                        />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                {formError && (
                  <p className="text-red-500 text-sm mt-2">{formError}</p>
                )}

                <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={() => form.reset()}>Cancelar</Button>
                  <Button type="submit">Guardar</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
