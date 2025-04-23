import { RegisterPayload } from '@/types/userType'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const VALIDATE_PHONE_MESSAGE = 'Phone number invalid'

const register = async (req: Request, _: Response, next: NextFunction) => {
  const schema = Joi.object<RegisterPayload>({
    name: Joi.string().required().max(256),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com'] }
      }),
    phone: Joi.string()
      .required()
      .pattern(new RegExp(regexPhoneNumber))
      .message(VALIDATE_PHONE_MESSAGE),
    password: Joi.string().min(6)
  })

  try {
    await schema.validateAsync(req.body || {}, { abortEarly: false })
    next()
  } catch (error: any) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error?.message))
  }
}

const authValidation = { register }

export default authValidation
