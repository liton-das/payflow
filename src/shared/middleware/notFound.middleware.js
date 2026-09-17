const notFoundMiddleware=(req,res)=>{
    res.status(404).json({
        success:false,
        message : `Page not found:${req.originalUrl}`
    })
}
module.exports = notFoundMiddleware