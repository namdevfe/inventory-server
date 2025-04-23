import authController from '@/controllers/authController'
import verifyTokenMiddleware from '@/middlewares/verifyTokenMiddleware'
import authValidation from '@/validations/authValidation'
import express from 'express'

const Router = express.Router()

/** Public routes */
Router.route('/register').post(authValidation.register, authController.register)
Router.route('/login').post(authValidation.login, authController.login)

/** Private routes */
Router.route('/profile').get(verifyTokenMiddleware, authController.getProfile)

export const authRoutes = Router
