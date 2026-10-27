# Phase 10.2 — Payment Validation and Repository

## Objective

Implement request validation and database access functions for the PayFlow Payment module.

## Files

- `src/modules/payment/payment.validation.js`
- `src/modules/payment/payment.repository.js`

## Validation Rules

- A payment request accepts an `orderId`.
- The `orderId` must match the 24-character hexadecimal MongoDB ObjectId format.
- The Service must verify that the Order exists and belongs to the authenticated Customer.
- The Customer must not control the payment amount, payment status, gateway payment ID, or user ID.
- Strict validation can reject unexpected request fields.

## Repository Functions

- `createPayment(paymentData)`
- `findPaymentById(paymentId)`
- `findPaymentByProviderPaymentId(providerPaymentId)`
- `findPaymentByIdempotencyKey(idempotencyKey)`
- `findPaymentsByOrder(orderId)`
- `findPaymentsByUser(userId)`

## Responsibilities

The validation layer checks request structure and format.

The repository layer performs database queries.

The service layer, implemented in the next phase, must enforce ownership, Order eligibility, trusted amount calculation, duplicate-payment protection, and payment lifecycle rules.

## Security Notes

- A valid ObjectId format does not prove that a record exists.
- Payment records must be scoped to the authenticated user where appropriate.
- Gateway payment identifiers must be verified against trusted gateway data.
- Unique database indexes can raise duplicate-key errors and must be handled.
- Lookup functions alone do not implement complete idempotency.

## Testing

- [ ] Valid Order ID passes validation.
- [ ] Invalid Order ID fails validation.
- [ ] Validation and repository modules import successfully.
- [ ] Database-backed repository tests will be added.
- [ ] Documentation is saved.

## Definition of Done

- Payment validation is implemented.
- Repository methods are implemented.
- Basic checks pass.
- Changes are committed to the feature branch.
