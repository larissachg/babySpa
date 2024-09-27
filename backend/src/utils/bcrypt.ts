import { hash, compare } from 'bcryptjs'

const encrypt = async (pass: string): Promise<string> => {
  const passwordHash = await hash(pass, 10)
  return passwordHash
}

const verified = async (pass: string, passHash: string): Promise<boolean> => {
  const isCorrect = await compare(pass, passHash)
  return isCorrect
}

const generateHash = async (salts: number, value: string = Date.now().toString()): Promise<string> => {
  const result = await hash(value, salts)
  return result
}

export { encrypt, verified, generateHash }
