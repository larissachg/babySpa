import { NextFunction, Response } from "express";
import { verifyToken } from "../../utils";
import { Usuarios } from "@prisma/client";
import { getUserById } from "../services";
import { InternalRequest } from "../interfaces";


export const validateAuthentication = async (req: InternalRequest, res: Response, next: NextFunction) => {
    const token = req.cookies['Authentication'];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    const user = await validateJwt(token)

    if (!user || !user.Estado) return res.status(401).json({ errors: [{ msg: "No tienes permisos para continuar" }] })

    req.user = user;
    return next()
};


const validateJwt = async (jwt: string): Promise<Usuarios | null> => {
    try {
        const { id } = verifyToken(jwt)
        return await getUserById(id)
    } catch (error) {
        return null
    }
}