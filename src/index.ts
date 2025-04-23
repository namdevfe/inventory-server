import express, { Request, Response } from 'express'

const HOST_NAME = 'localhost'
const HOST_PORT = 5000
const app = express()

app.get('', (req: Request, res: Response) => {
  res.send('<h1>Hello World</h1>')
})

app.listen(HOST_PORT, HOST_NAME, () => {
  console.log(`Server is running on http://${HOST_NAME}:${HOST_PORT}`)
})
