import authController from '@/controllers/authController'
import authValidation from '@/validations/authValidation'
import express from 'express'

const Router = express.Router()

Router.route('/register').post(authValidation.register, authController.register)

export const authRoutes = Router
