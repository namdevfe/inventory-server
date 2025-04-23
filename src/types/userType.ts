export interface User {
  id: string
  name: string
  email: string
  phone: string
  password?: string
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}

/** Auth */
export type RegisterPayload = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'refreshToken'
>
export type LoginPayload = Pick<User, 'email' | 'password'>
export type LoginResponse = Pick<User, 'refreshToken'> & {
  accessToken: string
}

/** Users */
export type CreateUserPayload = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'refreshToken'
>
