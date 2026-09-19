const { default: z } = require("zod");

const registerValidationSchema = z.object({
    name : z.string().min(2,'Name must be at least 2 characters')
    .max(20,'Name must not exceed 20 characters'),
    email : z.string().email('Please provide a valid email'),
    password : z.string().min(1,'Password is required')
})
const loginValidationSchema = z.object({
    email : z.string().email('Please provide a valid email'),
    password : z.string().min(1,'Password is required')
})

module.exports = {registerValidationSchema,loginValidationSchema}