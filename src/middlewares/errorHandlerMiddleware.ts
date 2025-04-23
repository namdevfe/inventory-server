import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

interface ResponseError {
  statusCode: number
  message: string
  errors?: { field: string; message: string }[]
  stack?: any
}

const errorHandlerMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!error.statusCode) error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError: ResponseError = {
    statusCode: error.statusCode,
    message: error.message || StatusCodes[error.statusCode],
    errors: error.errors || null,
    stack: error.stack
  }

  // If mode === 'production' is delete stack from responseError
  res.status(responseError.statusCode).json(responseError)
}

export default errorHandlerMiddleware
