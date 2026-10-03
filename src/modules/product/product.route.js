const authMiddleware = require('../../shared/middleware/auth.middleware')
const roleMiddleware = require('../../shared/middleware/role.middleware')
const { validate } = require('../../shared/middleware/validate.middleware')
const { getProductsController, getProductByIdController, createProductController, updateProductByIdController, deleteProductController } = require('./product.controller')
const { updateProductValidationSchema, createProductValidationSchema } = require('./product.validation')

const productRoute = require('express').Router()

// public
productRoute.get('/',getProductsController)
productRoute.get('/:id',getProductByIdController)

// Admin
productRoute.post('/',authMiddleware,roleMiddleware('ADMIN'),validate(createProductValidationSchema),createProductController)
productRoute.put('/:id',authMiddleware,roleMiddleware('ADMIN'),validate(updateProductValidationSchema),updateProductByIdController)
productRoute.delete('/:id',authMiddleware,roleMiddleware('ADMIN'),deleteProductController)

module.exports = productRoute