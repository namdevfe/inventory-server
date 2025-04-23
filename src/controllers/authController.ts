import { AuthenticatedRequest } from '@/middlewares/verifyTokenMiddleware'
import authService from '@/services/authService'
import { NextFunction, Request, Response } from 'express'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.login(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.user
  try {
    const response = await authService.getProfile(uid)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const authController = { register, login, getProfile }

export default authController
