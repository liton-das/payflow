const jwt = require("jsonwebtoken")
const env = require("../../config/env")

const generateToken = async(payload)=>{
    return await jwt.sign(payload,env.jwtSecret,{
        expiresIn : env.jwtExpire
    })
}
const verifyToken = async (token)=>{
    return await jwt.verify(token,env.jwtSecret)
}
module.exports = {
    generateToken,
    verifyToken
}