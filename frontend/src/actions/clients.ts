"use server";

import { ApiRoutes } from "@/constantes";
import { ClientInterface } from "@/interfaces";
import { apiGet } from "@/utils";

export const getClients = async () => {
  const response = await apiGet<ClientInterface[]>(ApiRoutes.CLIENTS.GET);

  return response?.data || [];
};
