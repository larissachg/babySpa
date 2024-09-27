import { Usuarios } from '@prisma/client'
import { Request } from 'express'

export interface InternalRequest extends Request {
    user?: Usuarios
}
