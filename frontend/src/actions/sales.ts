"use server";

import { ApiRoutes } from "@/constantes";
import { SaleInterface } from "@/interfaces";
import { apiGet } from "@/utils";

export const getSales = async () => {
  const response = await apiGet<SaleInterface[]>(ApiRoutes.SALES.GET);

  return response?.data || [];
};
