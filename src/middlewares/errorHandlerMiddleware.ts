import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

interface ResponseError {
  statusCode: number
  message: string
  stack?: any
}

const errorHandlerMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const responseError: ResponseError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
    stack: error.stack
  }

  // If mode === 'production' is delete stack from responseError
  res.status(responseError.statusCode).json(responseError)
}

export default errorHandlerMiddleware
