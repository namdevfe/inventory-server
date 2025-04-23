import { db } from '@/databases/db'
import { CreateUserPayload } from '@/types/userType'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import { ApiResponse } from '@/types/commonType'
import { User } from '@prisma/client'

/**
 * Check user already exist (email, username, phone)
 * Hash password
 * Modify response data (exclude fields such as: password)
 */
const createUser = async (payload: CreateUserPayload): Promise<ApiResponse> => {
  const { email, username, phone, password } = payload

  try {
    /** Check user already exist (username, email, phone) */
    const existingEmail = await db.user.findUnique({
      where: {
        email
      }
    })

    if (existingEmail) {
      throw new ApiError(StatusCodes.CONFLICT, `${email} already exists`)
    }

    const existingUsername = await db.user.findUnique({
      where: {
        username
      }
    })

    if (existingUsername) {
      throw new ApiError(StatusCodes.CONFLICT, `${username} already exists`)
    }

    const existingPhone = await db.user.findUnique({
      where: {
        phone
      }
    })

    if (existingPhone) {
      throw new ApiError(StatusCodes.CONFLICT, `${phone} already exists`)
    }

    /** Hash password */
    const hashedPassword = await bcrypt.hash(password as string, 10)

    /** Create user */
    const createdUser = await db.user.create({
      data: {
        ...payload,
        password: hashedPassword
      },
      omit: {
        password: true
      }
    })

    /** Return response data */
    return {
      statusCode: StatusCodes.CREATED,
      message: 'Created user is successfully',
      data: createdUser
    }
  } catch (error) {
    throw error
  }
}

const userService = { createUser }

export default userService
