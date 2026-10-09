const authMiddleware = require('../../shared/middleware/auth.middleware')
const { createOrderController } = require('./order.controller')
const createOrderValidationSchema = require('./order.validation')
const { validate } = require('./order.validation')

const orderRoutes = require('express').Router()

orderRoutes.post('/',authMiddleware,validate(createOrderValidationSchema),createOrderController)


module.exports = {
    orderRoutes
}