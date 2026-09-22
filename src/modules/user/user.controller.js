const catchAsync = require("../../shared/utils/catchAsync");
const sendResponse = require("../../shared/utils/sendResponse");
const { findUserById } = require("./user.repository");
const { updateUserProfile } = require("./user.service");

const getUserProfileController = catchAsync(async(req,res)=>{
    const result = await findUserById(req.user.userId)
    return sendResponse(res,{
        statusCode : 200,
        success : true,
        message  : 'Profile retrived successfully',
        data : result
    })
})

const userUpdateController = catchAsync(async(req,res)=>{
    const result = await updateUserProfile({_id:req.user.userId},req.body)
    return sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'Profile updated successfully',
        data : result
    })
})

module.exports ={
    getUserProfileController,
    userUpdateController
}