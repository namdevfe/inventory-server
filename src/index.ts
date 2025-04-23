import { APIs_V1 } from '@/routes'
import express from 'express'

const HOST_NAME = 'localhost'
const HOST_PORT = 5000
const app = express()

app.use(express.json())

app.use('/api/v1', APIs_V1)

app.listen(HOST_PORT, HOST_NAME, () => {
  console.log(`Server is running on http://${HOST_NAME}:${HOST_PORT}`)
})
