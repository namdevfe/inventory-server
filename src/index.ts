import { env } from '@/config/environment'
import errorHandlerMiddleware from '@/middlewares/errorHandlerMiddleware'
import { APIs_V1 } from '@/routes'
import express from 'express'

const app = express()

app.use(express.json())

app.use('/api/v1', APIs_V1)

app.use(errorHandlerMiddleware)

app.listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`)
})
