const z = require('zod')
const createProductValidationSchema = z.object({
    name: z.string()
        .min(2,'Product name must be at least 2 characters')
        .max(100,'Product name must not exceed 100 characters'),
    description: z.string()
        .min(10,'Description must be at least 10 characters'),
    price : z.number()
        .min(0,'Price cannot be nagative'),
    image : z.string()
        .url('Image must be a valid URL')
        .optional()
        .or(z.literal("")),
    isActive: z.enum(['ACTIVE','INACTIVE'])
        .optional(),
    stock : z.number()
        .min(0,'Stock cannot be nagative')
})

const updateProductValidationSchema = createProductValidationSchema.partial()
module.exports ={
    createProductValidationSchema,
    updateProductValidationSchema
}