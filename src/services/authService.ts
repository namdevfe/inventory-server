import { db } from '@/databases/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ApiResponse } from '@/types/commonType'
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User
} from '@/types/userType'
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
        password: true,
        refreshToken: true
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

const login = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const { email, password } = payload

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    })

    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    const isCorrectPassword = bcrypt.compareSync(
      password as string,
      existingUser.password
    )

    if (!isCorrectPassword) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Credential invalid')
    }

    /** Generate token include access token and refresh token */
    const accessToken = jwt.sign(
      {
        uid: existingUser.id,
        email: existingUser.email
      },
      'accessToken',
      { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
      {
        uid: existingUser.id,
        email: existingUser.email
      },
      'refreshToken',
      { expiresIn: '365d' }
    )

    await db.user.update({
      where: {
        email
      },
      data: {
        refreshToken
      }
    })

    return {
      statusCode: StatusCodes.OK,
      message: 'Login is successfully',
      data: {
        accessToken,
        refreshToken
      }
    }
  } catch (error) {
    throw error
  }
}

const authService = { register, login }

export default authService
