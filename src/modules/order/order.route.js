const orderRoutes = require('express').Router()
const authMiddleware = require('../../shared/middleware/auth.middleware')
const { validate } = require('../../shared/middleware/validate.middleware')
const { createOrderController, getMyOrdersController, getMyorderByIdController } = require('./order.controller')
const  createOrderValidationSchema  = require('./order.validation')

orderRoutes.post('/',authMiddleware,validate(createOrderValidationSchema),createOrderController)
orderRoutes.get('/',authMiddleware,getMyOrdersController)
orderRoutes.get('/:id',authMiddleware,getMyorderByIdController)
module.exports={
    orderRoutes
}