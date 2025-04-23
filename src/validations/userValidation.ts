import {
  PHONE_NUMBER_MESSAGE,
  PHONE_NUMBER_PATTERN
} from '@/constants/validator'
import { CreateUserPayload, Gender } from '@/types/userType'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi, { ValidationError } from 'joi'

const createUser = async (req: Request, _res: Response, next: NextFunction) => {
  const payload = req.body || {}
  const createUserSchema = Joi.object<CreateUserPayload>({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
      .trim()
      .strict()
      .messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is not allowed to be empty',
        'string.email': 'Email must be a valid email',
        'string.trim': 'Email must not have leading or trailing whitespace'
      }),
    username: Joi.string().required().max(256).trim().strict().messages({
      'any.required': 'Username is required',
      'string.empty': 'Username is not allowed to be empty',
      'string.trim': 'Username must not have leading or trailing whitespace'
    }),
    password: Joi.string().required().min(6).trim().strict().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password min 6 chars',
      'string.trim': 'Password must not have leading or trailing whitespace'
    }),
    phone: Joi.string()
      .required()
      .pattern(PHONE_NUMBER_PATTERN)
      .trim()
      .strict()
      .messages({
        'any.required': 'Phone is required',
        'string.empty': 'Phone is not allowed to be empty',
        'string.trim': 'Phone must not have leading or trailing whitespace',
        'string.pattern.base': PHONE_NUMBER_MESSAGE
      }),
    firstName: Joi.string().required().trim().strict().messages({
      'any.required': 'Firstname is required',
      'string.empty': 'Firstname is not allowed to be empty',
      'string.trim': 'Firstname must not have leading or trailing whitespace'
    }),
    lastName: Joi.string().required().trim().strict().messages({
      'any.required': 'Lastname is required',
      'string.empty': 'Lastname is not allowed to be empty',
      'string.trim': 'Lastname must not have leading or trailing whitespace'
    }),
    gender: Joi.string().required().valid(Gender.MALE, Gender.FEMALE).messages({
      'any.required': 'Gender is required',
      'any.only': 'Gender must be one of [MALE, FEMALE]'
    }),
    avatar: Joi.string().allow(null, ''),
    dob: Joi.date().allow(null),
    shop: Joi.array().items(Joi.string().required()).default([])
  })

  try {
    await createUserSchema.validateAsync(payload, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      const errors = error.details.map((item) => ({
        field: item.path.join('.'),
        message: item.message
      }))

      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          StatusCodes[StatusCodes.UNPROCESSABLE_ENTITY],
          errors
        )
      )
    }

    next(error)
  }
}

const userValidation = { createUser }

export default userValidation
