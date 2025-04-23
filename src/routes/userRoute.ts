import userController from '@/controllers/userController'
import userValidation from '@/validations/userValidation'
import express, { Request, Response } from 'express'

const Router = express.Router()

Router.route('/')
  .get((req: Request, res: Response) => {
    res.status(200).json('GET: APIs_V1 get list users')
  })
  .post(userValidation.createUser, userController.createUser)

export const userRoutes = Router
