const AppError = require("../../shared/errors/AppError")
const { hashPassword, comparePassword } = require("../../shared/utils/bcrypt")
const { generateToken } = require("../../shared/utils/jwt")
const userModel = require("../user/user.model")
const { findUserBYEmail, createUser } = require("./auth.repository")

const register = async(payload)=>{
    const existUser = await findUserBYEmail(payload.email)
    if(existUser){
        throw new AppError(409,'Email already exist!')
    }
    const hashedPassword = await hashPassword(payload.password)
    const user = await createUser({
        ...payload,
        password : hashedPassword
    })
    const token = await generateToken({
        userId : user._id,
        role : user.role
    })
    return {
        user : {
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        },
        token,
    }
}

const login = async (payload)=>{
    const user = await findUserBYEmail(payload.email)
    if(!user){
        throw new AppError(401,'Invalid creadintials!')
    }
    if(!user.isActive){
        throw new AppError(403,'User account is inactive')
    }
    const isPasswordMatch = await comparePassword(payload.password,user.password)
    if(!isPasswordMatch){
        throw new AppError(401,'Invalid creadintials!')
    }
    const token = await generateToken({
        userId : user._id,
        role : user.role
    })
    return {
        user:{
            userId : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        },
        token
    }
}
module.exports = {
    register,
    login
}