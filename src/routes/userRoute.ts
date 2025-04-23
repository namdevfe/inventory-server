import { db } from '@/databases/db'
import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req: Request, res: Response) => {
    res.status(200).json('GET: APIs_V1 get list users')
  })
  .post(async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body || {}

    try {
      const createdUser = await db.user.create({
        data: {
          name,
          email,
          phone,
          password
        }
      })

      res.status(200).json({
        statusCode: StatusCodes.CREATED,
        message: 'Created new user is successfully',
        data: createdUser
      })
    } catch (error) {
      res.status(400).json({ message: 'Error' })
    }
  })

export const userRoutes = Router
