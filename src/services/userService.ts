import { db } from '@/databases/db'
import { CreateUserPayload } from '@/types/userType'
import { StatusCodes } from 'http-status-codes'

const createUser = async (payload: CreateUserPayload) => {
  const { name, email, password, phone } = payload
  try {
    const createdUser = await db.user.create({
      data: {
        name,
        email,
        phone,
        password
      }
    })

    return {
      statusCode: StatusCodes.CREATED,
      message: 'Created new user is successfully',
      data: createdUser
    }
  } catch (error) {
    throw error
  }
}

const userService = { createUser }

export default userService
