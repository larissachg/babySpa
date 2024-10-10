"use server"

import { ApiRoutes } from "@/constantes";
import { ProductInterface } from "@/interfaces";
import { apiGet } from "@/utils";

export const getProducts = async () => {

    const response = await apiGet<ProductInterface[]>(ApiRoutes.PRODUCTS.GET);

    return response?.data || [];

}