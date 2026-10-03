const AppError = require("../../shared/errors/AppError")
const { createProduct, findAllProduct, findProductById, updateProductById, deleteProductById } = require("./product.repository")

const createProductService = async (payload,userId)=>{
    const product = await createProduct({
        ...payload,
        createdBy : userId
    })
    return product
}

const getProductsService = async()=>{
    return await findAllProduct({
        isActive : 'ACTIVE'
    })
}
const getProductByIdService = async(productId)=>{
    const product = await findProductById(productId)
    if(!product){
        throw new AppError(404,'Product not found!')
    }
    return product
}
const updateProductService = async(productId,payload)=>{
    const product = await updateProductById(productId,payload)
    if(!product){
        throw new AppError(404,'Product not found!')
    }
    return product
}
const deleteProductService = async(productId)=>{
    const product = await deleteProductById(productId)
    if(!product){
        throw new AppError(404,'Product not found!')
    }
    return product
}

module.exports ={
    createProductService,
    getProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService
}