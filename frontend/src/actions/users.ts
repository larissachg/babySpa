"use server";

import { ApiRoutes } from "@/constantes";
import { UserInterface } from "@/interfaces";
import { apiGet, apiPost, apiPut } from "@/utils";

export const getUsers = async () => {
  const response = await apiGet<UserInterface[]>(ApiRoutes.USERS.GET);

  return response?.data || [];
};

export const getUserById = async (id: string) => {
  const response = await apiGet<UserInterface>(`${ApiRoutes.USERS.GET}/${id}`);

  return response?.data;
};

export const registerUser = async (data: UserInterface) => {
  const response = await apiPost<UserInterface, UserInterface>(
    ApiRoutes.USERS.PUT,
    data
  );
  return response;
};

export const updateUser = async (data: UserInterface, id: string) => {
  const response = await apiPut<UserInterface, UserInterface>(
    `${ApiRoutes.USERS.PUT}/${id}`,
    data
  );
  return response;
};
