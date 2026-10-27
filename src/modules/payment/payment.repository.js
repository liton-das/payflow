const Payment = require("./payment.model")

const createPayment = async(paymentData)=>{
    return await Payment.create(paymentData)
}
const findPaymentById = async(paymentId)=>{
    return await Payment.findById(paymentId)
}
const findPaymentByProviderPaymentId = async(providerPaymentId)=>{
    if(!providerPaymentId) return null
    return await Payment.findOne({providerPaymentId})
}
const findPaymentByIdempotencyKey=async(idempotencyKey)=>{
    if(!idempotencyKey) return null
    return await Payment.findOne({idempotencyKey})
}
const findPaymentsByOrder = async(orderId)=>{
    return await Payment.find({orderId}).sort({createdAt:-1})
}
const findPaymentsByUser = async(userId)=>{
    return await Payment.find({userId}).sort({createdAt:-1})
}
module.exports={
    createPayment,
    findPaymentById,
    findPaymentByProviderPaymentId,
    findPaymentByIdempotencyKey,
    findPaymentsByOrder,
    findPaymentsByUser
}