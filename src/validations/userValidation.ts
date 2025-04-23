import { CreateUserPayload } from '@/types/userType'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const VALIDATE_PHONE_MESSAGE = 'Phone number invalid'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<CreateUserPayload>({
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
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: any) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error?.details
    })
  }
}

const userValidation = { createUser }

export default userValidation
