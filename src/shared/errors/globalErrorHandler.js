const globalErrorHandler = (err,req,res,next) =>{
    console.error(err)
    res.status(err.statusCode || 500).json({
        success : false,
        message : `${err.message || 'internal server error'}`
    })
}
module.exports = globalErrorHandler