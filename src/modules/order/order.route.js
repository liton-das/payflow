const orderRoutes = require('express').Router()
const authMiddleware = require('../../shared/middleware/auth.middleware')
const roleMiddleware = require('../../shared/middleware/role.middleware')
const { validate } = require('../../shared/middleware/validate.middleware')
const { createOrderController, getMyOrdersController, getMyorderByIdController, getAllOrdersByAdminController, getSingleOrderByAdminController } = require('./order.controller')
const  createOrderValidationSchema  = require('./order.validation')

orderRoutes.post('/',authMiddleware,validate(createOrderValidationSchema),createOrderController)
orderRoutes.get('/',authMiddleware,getMyOrdersController)
orderRoutes.get('/admin',authMiddleware,roleMiddleware('ADMIN'),getAllOrdersByAdminController)
orderRoutes.get('/admin/:id',authMiddleware,roleMiddleware('ADMIN'),getSingleOrderByAdminController)
orderRoutes.get('/:id',authMiddleware,getMyorderByIdController)
module.exports={
    orderRoutes
}