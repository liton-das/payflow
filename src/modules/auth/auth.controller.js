const catchAsync = require("../../shared/utils/catchAsync");
const sendResponse = require("../../shared/utils/sendResponse");
const { register, login } = require("./auth.service");

const registerController = catchAsync(async(req,res)=>{
    const result = await register(req.body)

    sendResponse(res,{
        statusCode:200,
        success : true,
        message : 'Registration successfully',
        data : result
    })
})
const loginController = catchAsync(async(req,res)=>{
    const result = await login(req.body)
    sendResponse(res,{
        statusCode:200,
        success:true,
        message : 'Login successfully',
        data : result
    })
})

module.exports = {
    registerController,
    loginController
}