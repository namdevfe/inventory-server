import authController from '@/controllers/authController'
import authValidation from '@/validations/authValidation'
import express from 'express'

const Router = express.Router()

Router.route('/register').post(authValidation.register, authController.register)
Router.route('/login').post(authValidation.login, authController.login)

export const authRoutes = Router
