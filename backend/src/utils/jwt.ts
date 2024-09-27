import { JwtPayload, sign, verify } from 'jsonwebtoken'
import config from '../config'

const generateToken = (id: string): string => {
  const jwt = sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiration || '14h',
  })
  return jwt
}

const verifyToken = (jwt: string): JwtPayload => {
  const isOk = verify(jwt, config.jwtSecret)
  return isOk as JwtPayload
}

export { generateToken, verifyToken }
