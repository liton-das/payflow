const productModel = require("./product.model")

const createProduct = async(productData) => {
    return await productModel.create(productData)
}
const findAllProduct = async(filter = {}) => {
 return await productModel.find(filter).sort({ createdAt: -1 })
}
const findProductById = async(productId) => {
    return await productModel.findById(productId)
}
const updateProductById = async(productId,updateData) => {
    return await productModel.findByIdAndUpdate(productId,updateData,{new : true,runValidators:true})
}
const deleteProductById = async(productId) => {
    return await productModel.findByIdAndDelete(productId)
}

module.exports ={
    createProduct,
    findAllProduct,
    findProductById,
    updateProductById,
    deleteProductById
}