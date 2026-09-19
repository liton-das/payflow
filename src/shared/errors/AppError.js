class AppError extends Error{
    constructor(statusCode,message,errorCode=null){
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
    Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = AppError