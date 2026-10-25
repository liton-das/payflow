# Phase 10.1 — Payment Model

## Objective

Create the initial Mongoose Payment model for the PayFlow modular monolith.

## Model Location

`src/modules/payment/payment.model.js`

## Payment Fields

- `order`: Reference to the Order.
- `user`: Reference to the Customer.
- `amount`: Payment amount.
- `currency`: Currency code; defaults to USD.
- `provider`: Payment gateway, currently STRIPE.
- `status`: Payment lifecycle status.
- `providerPaymentId`: External gateway payment identifier.
- `idempotencyKey`: Key used to prevent duplicate operations.
- `failureReason`: Failure details when applicable.
- `paidAt`: Timestamp of successful payment.
- `createdAt` and `updatedAt`: Managed by Mongoose timestamps.

## Payment Statuses

- PENDING
- PROCESSING
- SUCCEEDED
- FAILED
- CANCELLED
- REFUNDED

## Design Decisions

1. An Order may have multiple Payment attempts.
2. The Order reference is not unique.
3. Payment amount and currency must come from trusted server-side Order data.
4. Payment success must be confirmed by a verified gateway response or webhook.
5. The browser must not directly mark an Order as paid.
6. Unique sparse indexes are configured for gateway payment IDs and idempotency keys. Index creation and existing database index conflicts must be checked in the target environment.

## Current Limitations

- No payment repository or service yet.
- No payment API endpoint yet.
- No Stripe integration yet.
- No verified webhook processing yet.
- No complete idempotency workflow yet.
- Monetary precision and currency rules require confirmation before gateway integration.

## Definition of Done

- [ ] Payment model file exists.
- [ ] Model imports successfully.
- [ ] Field names and status values are reviewed.
- [ ] Documentation is saved.
- [ ] Changes are committed on the intended feature branch.
