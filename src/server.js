const app = require("./app")
const connectDB = require("./config/db")
const env = require("./config/env")


const startServer =async()=>{
    try {
        await connectDB()
        app.listen(env.port,()=>{
            console.log(`PayFlow server running on port ${env.port}`)
        })
    } catch (error) {
        console.log(`Server startup failed:${error?.message}`)
        process.exit(1)
    }
}
startServer()