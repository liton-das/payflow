const { default: mongoose, model } = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    unitPrice : {
        type : Number,
        required : true,
        min : 0
    },
    quantity : {
        type : Number,
        required : true,
        min : 1
    },
    subtotal : {
        type : Number,
        required : true,
        min : 0
    }
},{_id:false})

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : {
        type : [orderItemSchema],
        required : true,
        validate : {
            validator : (items)=>items.length > 0,
            message : 'Order must contain at least 1 items'
        }
    },
    totalAmount : {
        type : Number,
        required : true,
        min : 0
    },
    currency:{
        type : String,
        required : true,
        default : 'QR',
        uppercase:true
    },
    isActive : {
        type : String,
        enum :['PENDING','PAID','FAILED','CALCELLED'],
        default : 'PENDING'
    }
},{timestamps:true})
module.exports = model('Order',orderSchema)