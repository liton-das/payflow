# Phase 09.6 — Admin Order Management API

## 1. Overview

This phase introduces read-only administrative APIs for retrieving all orders and viewing an individual order.

## 2. Endpoints

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/v1/orders/admin` | Admin only |
| GET | `/api/v1/orders/admin/:id` | Admin only |

## 3. Authentication and Authorization

Both endpoints require a valid JWT.

The authentication middleware verifies the token. The role middleware then checks that the authenticated user's role is `ADMIN`.

- Unauthenticated requests receive `401 Unauthorized`.
- Authenticated non-admin users receive `403 Forbidden`.

## 4. Retrieve All Orders

The service calls the Order Repository's `findAllOrders()` function.

Orders are sorted by creation time in descending order. The current implementation returns all orders without pagination.

An empty database result is returned as an empty array.

## 5. Retrieve an Individual Order

The service retrieves the order by ID through `findOrderById()`.

- If the order exists, it is returned.
- If the order does not exist, the service throws a `404` error.

This endpoint is protected by admin authorization. Customer ownership checks remain in the customer-specific `getMyOrderById()` service function.

## 6. Architecture

`Admin Request → Authentication Middleware → Role Middleware → Order Controller → Order Service → Order Repository → MongoDB`

- **Route:** Defines the endpoints and middleware order.
- **Authentication Middleware:** Verifies the JWT.
- **Role Middleware:** Allows only administrators.
- **Controller:** Handles HTTP requests and responses.
- **Service:** Coordinates order retrieval and not-found handling.
- **Repository:** Reads order documents from MongoDB.

## 7. Security Rules

- Both endpoints require authentication.
- Only users with the `ADMIN` role can access these endpoints.
- Customer-specific order retrieval continues to enforce ownership.
- Administrative access is read-only in this phase.
- Order status changes, cancellation, and refunds are out of scope.

## 8. Limitations

The current `findAllOrders()` implementation has no pagination. This is acceptable for the small learning MVP, but a production system should introduce pagination and appropriate query limits.

## 9. Testing Checklist

- [ ] Admin can retrieve all orders.
- [ ] Admin can retrieve a specific existing order.
- [ ] Missing token is rejected.
- [ ] Customer access is rejected with 403.
- [ ] A nonexistent order returns 404.
- [ ] Existing customer ownership checks still work.

## 10. Definition of Done

- [ ] Service functions implemented.
- [ ] Controller functions implemented.
- [ ] Admin routes registered.
- [ ] Authentication and role authorization applied.
- [ ] Positive and negative tests completed.
- [ ] Documentation saved.
- [ ] Git changes committed and pushed.

**Phase status:** Complete after implementation, testing, and documentation have been verified.