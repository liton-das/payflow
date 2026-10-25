const { Schema, default: mongoose, model } = require("mongoose")

const paymentSchema = new Schema({
    order :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required : true,
        index : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },
    amount : {
        type : Number,
        required : true,
        min : 0
    },
    currency : {
        type : String,
        required : true,
        default : 'QR',
        uppercase : true,
        trim : true
    },
    provider : {
        type : String,
        enum : ['STRIPE'],
        required : true
    },
    isApproved : {
        type : String,
        enum : ['PENDING','PROCESSING','SUCCESSED','FAILED','CANCELLED','REFUNDED'],
        default : 'PENDING',
        required : true
    },
    providerPaymentId:{
        type : String,
        default : undefined,
        sparse : true,
        unique : true
    },
    idempotencyKey:{
        type : String,
        default : undefined,
        sparse : true,
        unique : true
    },
    failureReason : {
        type : String,
        defaul : '',
        trim : true
    },
    paidAt : {
        type : Date,
        default : null
    }
},{timestamps:true})
const Payment = mongoose.model('Payment',paymentSchema)
module.exports = Payment