export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
