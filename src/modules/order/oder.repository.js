const orderModel = require("./order.model")

const createOrder = async(orderData)=>{
    return orderModel.create(orderData)
}
const findOrderByUser = async(userId)=>{
    return orderModel.find({user:userId}).sort({createdAt:-1})
}
const findOrderById = async(orderId)=>{
    return orderModel.findById(orderId)
}
const findAllOrders = async()=>{
    return orderModel.find().sort({createdAt:-1})
}
module.exports={
    createOrder,
    findOrderByUser,
    findOrderById,
    findAllOrders
}