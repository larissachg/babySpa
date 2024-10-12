import axios from "axios";
import { ApiRoutes } from "@/constantes";
import { cookies } from "next/headers";
import { ApiResponseInterface } from "@/interfaces";

const apiClient = axios.create({
    baseURL: ApiRoutes.BASE,
    withCredentials: true,
});

export const apiGet = async <T>(url: string): Promise<ApiResponseInterface<T> | undefined> => {
    try {
        const { data } = await apiClient.get<ApiResponseInterface<T>>(url, {
            headers: {
                Cookie: cookies().toString(),
            },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                return error.response.data;
            }
        }
        console.error("Error inesperado:", error);
        return undefined;
    }
};

export const apiPost = async <T, U>(url: string, body: U): Promise<ApiResponseInterface<T> | undefined> => {
    try {
        const { data } = await apiClient.post<ApiResponseInterface<T>>(url, body, {

            headers: {
                Cookie: cookies().toString(),
            },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                return error.response.data;
            }
        }
        console.error("Error inesperado:", error);
        return undefined;
    }
};

export const apiPut = async <T, U>(url: string, body: U): Promise<ApiResponseInterface<T> | undefined> => {
    try {
        const { data } = await apiClient.put<ApiResponseInterface<T>>(url, body, {

            headers: {
                Cookie: cookies().toString(),
            },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                return error.response.data;
            }
        }
        console.error("Error inesperado:", error);
        return undefined;
    }
};

export const apiDelete = async <T>(url: string): Promise<ApiResponseInterface<T> | undefined> => {
    try {
        const { data } = await apiClient.delete<ApiResponseInterface<T>>(url, {

            headers: {
                Cookie: cookies().toString(),
            },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                return error.response.data;
            }
        }
        console.error("Error inesperado:", error);
        return undefined;
    }
};
