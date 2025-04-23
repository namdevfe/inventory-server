import express, { Request, Response } from 'express'
import { userRoutes } from '@/routes/userRoute'

const Router = express.Router()

// Check status APIs_V1
Router.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'APIs_V1 are ready to use' })
})

Router.use('/users', userRoutes)

export const APIs_V1 = Router
