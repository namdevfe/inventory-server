class ApiError extends Error {
  statusCode: number
  errors?: { field: string; message: string }[]

  constructor(
    statusCode: number,
    message: string,
    errors?: { field: string; message: string }[]
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
