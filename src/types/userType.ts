export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum Role {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
}
export interface User {
  id: string
  username: string
  email: string
  phone: string
  password?: string
  firstName: string
  lastName: string
  dob?: Date
  gender: Gender
  avatar?: string
  role: Role
  shop?: string[]
  createdAt: Date
  updatedAt: Date
}

export type CreateUserPayload = Omit<
  User,
  'id' | 'role' | 'createdAt' | 'updatedAt'
>
