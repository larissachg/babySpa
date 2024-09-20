import { getClients } from "../services";

export const getAllClients = async () => {
  try {
    return await getClients();
  } catch (error) {
    throw new Error(error.message);
  }
};
