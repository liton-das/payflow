const AppError = require("../../shared/errors/AppError");
const { findUserById, findUserByEmail, findUserUpdateById } = require("./user.repository")

// get user own profile 
const getUserProfile = async (userId)=>{
    const user = await findUserById(userId)
    if(!user){
        throw new AppError(404,'User not found');
    }
    return {
        userId : user._id,
        name : user.name,
        email : user.email,
        role : user.role,
        isActive : user.isActive,
        createdAt : user.createdAt,
        updatedAt : user.updatedAt
    }
}
// update user own profile 
const updateUserProfile = async(userId, payload)=>{
    if(payload.email){
        const existingUser = await findUserByEmail(payload.email)

        if(existingUser && existingUser._id.toString() !== userId.toString()){
            throw new AppError(409,'User email already exist!')
        }
    }
    const updateUser = await findUserUpdateById(userId,payload)
    if(!updateUser){
        throw new AppError(404,'User not found!')
    }
    return {
        id : updateUser._id,
        name : updateUser.name,
        email : updateUser.email,
        role : updateUser.role,
        isActive : updateUser.isActive,
        createdAt : updateUser.createdAt,
        updatedAt : updateUser.updatedAt
    }

}
module.exports = {
    getUserProfile,
    updateUserProfile
}