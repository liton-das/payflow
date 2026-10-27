const z = require('zod')
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");
const createPaymentValidationSchema = z.object({
    orderId : objectIdSchema
}).strict()

module.exports = {createPaymentValidationSchema}