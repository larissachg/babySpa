"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { AppointmentInterface, ClientInterface } from "@/interfaces";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { addHours, addMinutes, format, set } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown, ClockIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getClients } from "@/actions/clients";

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
  IdCliente: 4,
  FechaInicio: set(addHours(new Date(), 1), {
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }),
  FechaFin: new Date(),
  Estado: "Agendado",
  IdProducto: 1,
  Fisioterapeuta: "Test",
  Observacion: "",
};

interface FormAppointmentProps {
  data?: AppointmentInterface;
  refreshAppointments: () => Promise<void>;
  //   type?: "new" | "update";
}

export const FormAppointment = ({
  data,
  refreshAppointments,
}: FormAppointmentProps) => {
  const form = useForm<AppointmentInterface>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: data ?? defaultValue,
  });

  const [formError, setFormError] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const [duracion, setDuracion] = useState({ hours: 1, minutes: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaCLientes, setListaClientes] = useState<ClientInterface[]>([]);

  async function onSubmit(data: AppointmentInterface) {
    let newEndDate = data.FechaInicio;
    newEndDate = addHours(data.FechaInicio, duracion.hours);
    newEndDate = addMinutes(data.FechaInicio, duracion.minutes);

    const appointmentData = {
      ...data,
      FechaFin: newEndDate,
    };

    const response = await registerAppointment(appointmentData);

    if (!response) return setFormError("Error al registrar la cita");
    if (response.errors) return setFormError(`${response.errors[0].msg}`);

    setDuracion({ hours: 1, minutes: 0 });

    toast({
      variant: "success",
      description: "Cita registrada exitosamente!",
    });

    setIsModalOpen(false);
    await refreshAppointments();
  }

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("FechaInicio", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = form.getValues("FechaInicio") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue("FechaInicio", newDate);
  }

  const fetchCustomers = async () => {
    const customers: ClientInterface[] = await getClients();
    setListaClientes(customers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <TooltipProvider>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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

        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
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
                    <FormItem className="flex flex-col col-start-1 col-end-3 w-full">
                      <FormLabel>Bebe</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? listaCLientes.find(
                                    (cliente) =>
                                      cliente.IdCliente === field.value
                                  )?.NombreBebe
                                : "Seleccionar Bebe"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Buscar cliente..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Cliente no encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {listaCLientes.map((cliente) => (
                                  <CommandItem
                                    value={cliente.NombreBebe}
                                    key={cliente.IdCliente}
                                    onSelect={() => {
                                      form.setValue(
                                        "IdCliente",
                                        cliente.IdCliente!
                                      );
                                    }}
                                  >
                                    {cliente.NombreBebe}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        cliente.IdCliente === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Fecha y hora de inicio */}
                <FormField
                  control={form.control}
                  name="FechaInicio"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Seleccionar hora y fecha</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              role="dialog"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MM/dd/yyyy hh:mm aa")
                              ) : (
                                <span>MM/DD/YYYY hh:mm aa</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <div className="sm:flex">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={handleDateSelect}
                              initialFocus
                            />
                            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                              <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                  {Array.from({ length: 12 }, (_, i) => i + 1)
                                    .reverse()
                                    .map((hour) => (
                                      <Button
                                        key={hour}
                                        role="listitem"
                                        type="button"
                                        size="icon"
                                        variant={
                                          field.value &&
                                          field.value.getHours() % 12 ===
                                            hour % 12
                                            ? "default"
                                            : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                          handleTimeChange(
                                            "hour",
                                            hour.toString()
                                          )
                                        }
                                      >
                                        {hour}
                                      </Button>
                                    ))}
                                </div>
                                <ScrollBar
                                  orientation="horizontal"
                                  className="sm:hidden"
                                />
                              </ScrollArea>
                              <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                  {Array.from(
                                    { length: 4 },
                                    (_, i) => i * 15
                                  ).map((minute) => (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      role="listitem"
                                      type="button"
                                      variant={
                                        field.value &&
                                        field.value.getMinutes() === minute
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange(
                                          "minute",
                                          minute.toString()
                                        )
                                      }
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  ))}
                                </div>
                                <ScrollBar
                                  orientation="horizontal"
                                  className="sm:hidden"
                                />
                              </ScrollArea>
                              <ScrollArea className="">
                                <div className="flex sm:flex-col p-2">
                                  {["AM", "PM"].map((ampm) => (
                                    <Button
                                      key={ampm}
                                      size="icon"
                                      variant={
                                        field.value &&
                                        ((ampm === "AM" &&
                                          field.value.getHours() < 12) ||
                                          (ampm === "PM" &&
                                            field.value.getHours() >= 12))
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange("ampm", ampm)
                                      }
                                    >
                                      {ampm}
                                    </Button>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col">
                  <Label className="mb-2">Duración de la sesión</Label>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full pl-3 text-left font-normal"
                      >
                        {duracion.hours}h{" "}
                        {duracion.minutes.toString().padStart(2, "0")}m
                        <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="sm:flex">
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (hour) => (
                                <Button
                                  key={hour}
                                  size="icon"
                                  variant={
                                    duracion.hours === hour
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() => {
                                    setDuracion((prev) => ({
                                      ...prev,
                                      hours: hour,
                                    }));
                                  }}
                                >
                                  {hour}h
                                </Button>
                              )
                            )}
                          </div>
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {[0, 15, 30, 45].map((minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                variant={
                                  duracion.minutes === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => {
                                  setDuracion((prev) => ({
                                    ...prev,
                                    minutes: minute,
                                  }));
                                }}
                              >
                                {minute.toString().padStart(2, "0")}m
                              </Button>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </PopoverContent>
                  </Popover>
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

              <DialogFooter className="mt-4">
                {formError && (
                  <p className="text-red-500 text-sm mt-2">{formError}</p>
                )}

                <DialogClose asChild>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      onClick={() => {
                        form.reset();
                        setDuracion({ hours: 1, minutes: 0 });
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">Guardar</Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
