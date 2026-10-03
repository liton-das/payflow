const { Schema, model }=require('mongoose')
const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    image:{
        type: String,
        default: "",
        trim: true
    },
    stock:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    isActive:{
        type: String,
        enum: ['ACTIVE','INACTIVE'],
        default : 'ACTIVE'
    },
    createdBy:{
        type : Schema.Types.ObjectId,
        ref:'User',
        required: true,
    }
},{timestamps:true})

module.exports = model('Product',productSchema)