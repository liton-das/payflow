const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const notFoundMiddleware = require('./shared/middleware/notFound.middleware')
const globalErrorHandler = require('./shared/errors/globalErrorHandler')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/v1',router)
app.use(notFoundMiddleware)
app.use(globalErrorHandler)
module.exports = app