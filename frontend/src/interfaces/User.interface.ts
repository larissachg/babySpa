export interface AuthInterface {
    user: UserInterface;
    token: string;
}

export interface UserInterface {
    IdUsuario: number;
    Nombre: string;
    Email: string;
    Usuario: string;
    Password: string;
    Rol: string;
    Estado: boolean;
}
