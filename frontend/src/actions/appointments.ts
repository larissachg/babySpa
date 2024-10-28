"use server";

import { ApiRoutes } from "@/constantes";
import { AppointmentInterface } from "@/interfaces";
import { apiGet, apiPost, apiPut } from "@/utils";

export const getAppointments = async () => {
  const response = await apiGet<AppointmentInterface[]>(
    ApiRoutes.APPOINTMENTS.GET
  );

  return response?.data || [];
};

export const registerAppointment = async (data: AppointmentInterface) => {
  const response = await apiPost<AppointmentInterface, AppointmentInterface>(
    ApiRoutes.APPOINTMENTS.PUT,
    data
  );
  return response;
};

export const updateAppointment = async (
  data: AppointmentInterface,
  id: string
) => {
  const response = await apiPut<AppointmentInterface, AppointmentInterface>(
    `${ApiRoutes.APPOINTMENTS.PUT}/${id}`,
    data
  );
  return response;
};
