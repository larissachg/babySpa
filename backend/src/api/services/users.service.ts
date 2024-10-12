import { PrismaClient } from "@prisma/client";
import { UserInterface } from "../interfaces";
import { encrypt, generateToken, verified } from "../../utils";

const prisma = new PrismaClient();

export const registerNewUser = async (data: UserInterface) => {
  try {

    data.Password = await encrypt(data.Password);

    const newUser = await prisma.usuarios.create({
      data: {
        ...data,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error(`Error al registrar el usuario: ${error.message}`);
  }
};

export const updateUser = async (
  id: number,
  data: UserInterface
) => {
  try {
    const updateUser = await prisma.usuarios.update({
      where: {
        IdUsuario: id,
      },
      data: {
        Email: data.Email,
        Estado: data.Estado,
        Nombre: data.Nombre,
        Rol: data.Rol,
        Usuario: data.Usuario,
      },
    });

    if (updateUser.Password !== data.Password) {
      updateUser.Password = await encrypt(data.Password)
      await prisma.usuarios.update({
        where: {
          IdUsuario: id
        },
        data: {
          Password: updateUser.Password
        }
      })
    }

    return updateUser;
  } catch (error) {
    throw new Error(
      `Error al actualizar el usuario: ${error.message}`
    );
  }
};


export const updateUserPassword = async (
  id: number,
  password: string
) => {
  try {
    const updateUser = await prisma.usuarios.update({
      where: {
        IdUsuario: id,
      },
      data: {
        Password: await encrypt(password),
      },
    });

    return updateUser;
  } catch (error) {
    throw new Error(
      `Error al actualizar el usuario: ${error.message}`
    );
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.usuarios.findUnique({
      where: {
        IdUsuario: +id
      }
    })
    return user
  } catch (error) {
    throw new Error(
      `Error al obtener el usuario: ${error.message}`
    );
  }
}

export const validateUser = async (username: string, password: string) => {
  const user = await prisma.usuarios.findFirst({
    where: {
      Usuario: username
    }
  })

  if (user === null) throw Error('Usuario no existe')

  const validPass = await verified(password, user.Password)

  if (!validPass) throw Error('Contraseña incorrecta')

  const token = generateToken(user.IdUsuario.toString())


  return { user, token }

}

export const getAllUser = async () => {
  try {
    const appointments = await prisma.usuarios.findMany();

    return appointments;
  } catch (error) {
    throw new Error(
      `Error al obtener las citas: ${error.message}`
    );
  }
};
