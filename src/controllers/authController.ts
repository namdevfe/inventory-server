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

const authController = { register }

export default authController
