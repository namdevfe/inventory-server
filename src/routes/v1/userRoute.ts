import userController from '@/controllers/userController'
import userValidation from '@/validations/userValidation'
import express from 'express'

const Router = express.Router()

Router.route('/').post(userValidation.createUser, userController.createUser)

export const userRoutes = Router
