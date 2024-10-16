"use server";

import { ApiRoutes } from "@/constantes";
import { ClientInterface } from "@/interfaces";
import { apiGet, apiPost, apiPut } from "@/utils";

export const getClients = async () => {
  const response = await apiGet<ClientInterface[]>(ApiRoutes.CLIENTS.GET);

  return response?.data || [];
};

export const getClientById = async (id: string) => {
  const response = await apiGet<ClientInterface>(
    `${ApiRoutes.CLIENTS.GET}/${id}`
  );

  return response?.data;
};

export const registerClient = async (data: ClientInterface) => {
  const response = await apiPost<ClientInterface, ClientInterface>(
    ApiRoutes.CLIENTS.PUT,
    data
  );
  return response;
};

export const updateClient = async (data: ClientInterface, id: string) => {
  const response = await apiPut<ClientInterface, ClientInterface>(
    `${ApiRoutes.CLIENTS.PUT}/${id}`,
    data
  );
  return response;
};
