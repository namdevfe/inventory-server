import userService from '@/services/userService'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.createUser(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    res.json(StatusCodes.BAD_REQUEST).json({ message: 'Something went wrongs' })
  }
}

const userController = {
  createUser
}

export default userController
