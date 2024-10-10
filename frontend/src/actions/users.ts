"use server"

import { ApiRoutes } from "@/constantes";
import { UserInterface } from "@/interfaces";
import { apiGet } from "@/utils";

export const getUsers = async () => {

    const response = await apiGet<UserInterface[]>(ApiRoutes.USERS.GET);

    return response?.data || [];

}