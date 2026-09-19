const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    name:{
        type: String,
        required :true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true
    },
    password :{
        type : String,
        required :true,
        select : false
    },
    role :{
        type : String,
        enum : ['CUSTOMER','ADMIN'],
        default : 'CUSTOMER'
    },
    isActive : {
        type : Boolean,
        default : false
    }
},{timestamps:true})

module.exports = model('User',userSchema)