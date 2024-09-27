import { Usuarios_Rol } from "@prisma/client"

export interface UserInterface {
    IdUsuario?: number,
    Nombre: string,
    Email?: string,
    Usuario: string,
    Password: string,
    Rol: Usuarios_Rol
    Estado?: boolean
}