import express, { Request, Response } from 'express'

const Router = express.Router()

Router.route('/')
  .get((req: Request, res: Response) => {
    res.status(200).json('GET: APIs_V1 get list users')
  })
  .post((req: Request, res: Response) => {
    res.status(200).json('POST: APIs_V1 create new users')
  })

export const userRoutes = Router
