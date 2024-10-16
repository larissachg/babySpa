"use server";

import { ApiRoutes } from "@/constantes";
import { ProductInterface } from "@/interfaces";
import { apiGet, apiPost, apiPut } from "@/utils";

export const getProducts = async () => {
  const response = await apiGet<ProductInterface[]>(ApiRoutes.PRODUCTS.GET);

  return response?.data || [];
};

export const getProductById = async (id: string) => {
  const response = await apiGet<ProductInterface>(
    `${ApiRoutes.PRODUCTS.GET}/${id}`
  );

  return response?.data;
};

export const registerProduct = async (data: ProductInterface) => {
  const response = await apiPost<ProductInterface, ProductInterface>(
    ApiRoutes.PRODUCTS.PUT,
    data
  );
  return response;
};

export const updateProduct = async (data: ProductInterface, id: string) => {
  const response = await apiPut<ProductInterface, ProductInterface>(
    `${ApiRoutes.PRODUCTS.PUT}/${id}`,
    data
  );
  return response;
};
