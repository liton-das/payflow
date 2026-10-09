const AppError = require("../../shared/errors/AppError")
const { findProductById } = require("../product/product.repository")
const { createOrder } = require("./oder.repository")

const createOrderService = async(userId,payload)=>{
    const orderItems = []
    const totalAmount = 0

    for(const item of payload.items){
        const product = await findProductById(item.product)

        if(!product){
            throw new AppError(404,`Product not found:${item.product}`)
        }
        if(product.isActive !='ACTIVE'){
            throw new AppError(400,`Product is not available:${product.name}`)
        }
        if(item.quantity > product.stock){
            throw new AppError(400,`Insufficient stock for product:${product.name}`)
        }
        const subtotal = product.price*item.quantity
        orderItems.push({
            product : product._id,
            name : product.name,
            unitPrice:product.price,
            quantity : item.quantity,
            subtotal
        })
        totalAmount += subtotal
    }
    const order = await createOrder({
        user : userId,
        items : orderItems,
        totalAmount,
        currency:'QR',
        isActive : 'PENDING'
    })
    return order
}




module.exports ={
    createOrderService
}