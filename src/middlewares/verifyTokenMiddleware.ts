import jwt, { JwtPayload } from 'jsonwebtoken'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { env } from '@/config/environment'

// Define a custom type for the request that includes the user property
export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload | any
}

const verifyTokenMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(' ')?.[1]

    if (!token) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Token is required')
    }

    jwt.verify(token, env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Failed to authenticate token' })
      }

      // If the token is valid, save the decoded information to request for use in other routes
      req.user = decoded
      next()
    })
  } catch (error) {
    next(error)
  }
}

export default verifyTokenMiddleware
