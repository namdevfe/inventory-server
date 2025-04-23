import express, { Request, Response } from 'express'
import { userRoutes } from '@/routes/userRoute'
import { authRoutes } from '@/routes/authRoute'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

// Check status APIs_V1
Router.get('/status', (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: 'APIs_V1 are ready to use' })
})

Router.use('/auth', authRoutes)
Router.use('/users', userRoutes)

export const APIs_V1 = Router
