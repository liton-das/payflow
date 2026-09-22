const z = require('zod')
const updateProfileValidationSchema = z.object({
    name : z.string().min(2,'Name must be at least 2 characters').max(10,'Name must not exceed 10 characters').optional(),
    email : z.string().email('Please provide a valid email').optional()

})
module.exports = updateProfileValidationSchema