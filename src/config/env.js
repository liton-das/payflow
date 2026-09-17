const dotenv = require('dotenv')
dotenv.config()
const env ={
    port : process.env.PORT || 4000,
    nodeEnv : process.env.NODE_ENV || 'development',
    mongoUri : process.env.MONGODB_URI,
    jwtSecret : process.env.JWT_SECRET,
    jwtExpire : process.env.JWT_EXPIRES_IN
}
module.exports = env