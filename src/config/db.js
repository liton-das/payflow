const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async()=>{
    try {
      await mongoose.connect(env.mongoUri)
      console.log('db connected successfully');
    } catch (error) {
        console.log('mongodb conection failed!',error?.message)
        process.exit(1)
    }
}
module.exports = connectDB