const z = require('zod')
const createOrderValidationSchema = z.object({
    items : z.array(
        z.object({
            product: z.string().min(1,'Product ID is requried'),
            quantity : z.number().int('Quantity must be integer').min(1,'Quantity must be at least 1')
        })
    ).min(1,'Order must contain at least one item')
})

module.exports = createOrderValidationSchema