const userModel = require("./user.model")
// find single user by id
const findUserById = async(userId)=>{
    return await userModel.findOne(userId)
}

// update user by id
const findUserUpdateById=async(userId,updateData)=>{
    return userModel.findByIdAndUpdate(userId,updateData,{
        new : true,
        runValidators : true
    })
}

// find user by email
const findUserByEmail = async(userEmail)=>{
    return userModel.findOne(userEmail)
}

module.exports = {
    findUserById,
    findUserUpdateById,
    findUserByEmail
}