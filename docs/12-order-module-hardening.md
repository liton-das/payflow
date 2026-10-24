# Phase 09.7 — Order Module Hardening

## 1. Overview

This phase strengthens order creation and retrieval by handling malformed IDs and duplicate product entries, while reviewing authorization and documenting concurrency risks.

## 2. ObjectId Validation

Product IDs in order-creation requests must match the 24-character hexadecimal format of a MongoDB ObjectId.

Order retrieval services validate order IDs before querying the database.

- Invalid Product ID format: `422 Unprocessable Entity`
- Invalid Order ID format: `400 Bad Request`
- Validly formatted but nonexistent Order ID: `404 Not Found`

## 3. Duplicate Product Normalization

Multiple entries referencing the same product are combined before product availability and stock checks.

For example, quantities `4` and `3` for the same product are normalized into a single quantity of `7`.

This prevents each duplicate entry from passing an independent stock check when the combined quantity exceeds available stock.

The backend continues to calculate prices and totals from database product data.

## 4. Authorization Review

- Customers can retrieve only their own orders.
- Admin order endpoints require a valid JWT and the `ADMIN` role.
- Customer ownership checks remain in the service layer.
- Missing and unauthorized-to-view customer orders use the same not-found response.

## 5. Concurrency Limitation

The current order-creation flow reads stock and creates an order without an atomic stock reservation.

Concurrent requests may both observe sufficient stock and create orders whose combined quantity exceeds inventory.

This phase does not claim to solve concurrent stock consistency. Inventory reservation, atomic stock updates, payment failure handling, and payment webhook idempotency require a coordinated design.

## 6. Testing Checklist

- [ ] Reject malformed Product IDs.
- [ ] Reject malformed Order IDs.
- [ ] Return 404 for nonexistent orders.
- [ ] Combine duplicate product quantities.
- [ ] Reject combined quantity above stock.
- [ ] Accept combined quantity within stock.
- [ ] Verify calculated order totals.
- [ ] Verify customer ownership protection.
- [ ] Verify admin role protection.

## 7. Definition of Done

- [ ] Validation updated.
- [ ] Order ID checks added.
- [ ] Duplicate products normalized.
- [ ] Existing order creation and retrieval flows re-tested.
- [ ] Security checks re-tested.
- [ ] Documentation saved.
- [ ] Changes committed and pushed.

**Phase status:** Complete only after implementation, testing, and documentation have been verified.