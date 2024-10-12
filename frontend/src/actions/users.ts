"use server"

import { ApiRoutes } from "@/constantes";
import { UserInterface } from "@/interfaces";
import { apiGet, apiPost } from "@/utils";

export const getUsers = async () => {

    const response = await apiGet<UserInterface[]>(ApiRoutes.USERS.GET);

    return response?.data || [];

}

export const registerUser = async (data: UserInterface) => {
    const response = await apiPost<UserInterface, UserInterface>(ApiRoutes.USERS.POST, data);
    console.log(response);

    return response;
}