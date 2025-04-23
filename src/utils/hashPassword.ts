import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10
export const hashPassword = (plainTextPassword: string) => {
  if (!plainTextPassword) return ''
  return bcrypt.hashSync(plainTextPassword, SALT_ROUNDS)
}
