const userModel = require("../user/user.model")

const createUser = async(userData)=>{
    return await userModel.create(userData)
}
const findUserBYEmail = async(email)=>{
    return await userModel.findOne({email}).select('+password')
}

module.exports ={
    createUser, 
    findUserBYEmail
}