const z = require('zod')
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid MongoDB ObjectId')
const createOrderValidationSchema = z.object({
  items: z
    .array(
      z.object({
        product: objectIdSchema,
        quantity: z
          .number()
          .int("Quantity must be an integer")
          .min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "Order must contain at least one item"),
});

module.exports = createOrderValidationSchema