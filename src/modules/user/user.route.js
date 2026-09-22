const authMiddleware = require('../../shared/middleware/auth.middleware')
const { validate } = require('../../shared/middleware/validate.middleware')
const { getUserProfileController, userUpdateController } = require('./user.controller')
const updateProfileValidationSchema = require('./user.validation')

const userRoute = require('express').Router()

userRoute.get('/profile',authMiddleware,getUserProfileController)
userRoute.put('/profile',authMiddleware,validate(updateProfileValidationSchema),userUpdateController)

module.exports = userRoute