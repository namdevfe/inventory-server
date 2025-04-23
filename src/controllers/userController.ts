import userService from '@/services/userService'
import { NextFunction, Request, Response } from 'express'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.createUser(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const userController = { createUser }

export default userController
