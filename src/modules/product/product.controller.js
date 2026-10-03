const catchAsync = require("../../shared/utils/catchAsync");
const sendResponse = require("../../shared/utils/sendResponse");
const { createProductService, getProductsService, getProductByIdService, updateProductService, deleteProductService } = require("./product.service");

const createProductController = catchAsync(async(req,res)=>{
    const result =  await createProductService(
        req.body,
        req.user.userId
    )
    sendResponse(res,{
        statusCode : 201,
        success : true,
        message : 'Product created successfully',
        data : result
    })
})

const getProductsController = catchAsync(async(req,res)=>{
    const result = await getProductsService()
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'products retrieved successfully',
        data : result
    })
})

const getProductByIdController = catchAsync(async(req,res)=>{
    const result = await getProductByIdService(req.params.id)
    sendResponse(res,{
        statusCode: 200,
        success : true,
        message:'Product retrieved successfully',
        data : result
    })
})

const updateProductByIdController = catchAsync(async(req,res)=>{
    const result = await updateProductService(req.params.id,req.body)
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'Product updated successfully',
        data : result
    })
})

const deleteProductController = catchAsync(async(req,res)=>{
    const result = await deleteProductService(req.params.id)
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'Product deleted successfully',
        result : result
    })
})

module.exports = {
    createProductController,
    getProductsController,
    getProductByIdController,
    updateProductByIdController,
    deleteProductController
}