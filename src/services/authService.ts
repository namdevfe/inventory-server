import { db } from '@/databases/db'
import { ApiResponse } from '@/types/commonType'
import { RegisterPayload, User } from '@/types/userType'
import ApiError from '@/utils/ApiError'
import { hashPassword } from '@/utils/hashPassword'
import { StatusCodes } from 'http-status-codes'

const register = async (
  payload: RegisterPayload
): Promise<ApiResponse<User>> => {
  const { email, password, name, phone } = payload

  try {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          {
            email
          },
          {
            phone
          }
        ]
      }
    })

    if (existingUser) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `Email address or phone number had already exist`
      )
    }

    /** Hash password */
    const hashedPassword = hashPassword(password || '')

    /**  Create new user */
    const createdUser = await db.user.create({
      omit: {
        password: true
      },
      data: {
        email,
        name,
        phone,
        password: hashedPassword
      }
    })

    /** Return data response if create user is successfully */
    return {
      statusCode: StatusCodes.CREATED,
      message: 'Register is successfully',
      data: createdUser
    }
  } catch (error) {
    throw error
  }
}

const authService = { register }

export default authService
