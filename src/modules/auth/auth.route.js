const { validate } = require('../../shared/middleware/validate.middleware')
const { registerController, loginController } = require('./auth.controller')
const { registerValidationSchema, loginValidationSchema } = require('./auth.validation')

const authRoutes = require('express').Router()

authRoutes.post('/register',validate(registerValidationSchema),registerController)
authRoutes.post('/login',validate(loginValidationSchema),loginController)

module.exports = authRoutes