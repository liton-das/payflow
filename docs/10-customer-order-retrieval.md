# Phase 09.5 — Customer Order Retrieval API

## 1. Overview

This phase introduces APIs that allow authenticated customers to retrieve their own orders and view an individual order's details.

## 2. Endpoints

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/api/v1/orders/my` | Required |
| GET | `/api/v1/orders/:id` | Required |

## 3. My Orders

Returns the orders belonging to the authenticated customer, sorted by creation time in descending order.

The customer ID is obtained from the verified JWT. The API does not accept a customer ID from the request body or query string.

An authenticated customer with no orders receives an empty array.

## 4. Order Details

Returns an individual order only when it belongs to the authenticated customer.

The service:
1. Retrieves the order by ID.
2. Returns `404` if the order does not exist.
3. Compares the order owner with the authenticated user's ID.
4. Returns `404` if the order belongs to another user.
5. Returns the order if ownership is verified.

Using the same not-found response for missing and unauthorized-to-view orders avoids disclosing whether another customer's order exists.

## 5. Architecture

`Order Route → Authentication Middleware → Order Controller → Order Service → Order Repository → MongoDB`

- **Route:** Defines the GET endpoints.
- **Authentication Middleware:** Verifies the JWT.
- **Controller:** Handles HTTP request and response concerns.
- **Service:** Enforces order ownership.
- **Repository:** Retrieves orders from MongoDB.

## 6. Security Rules

- Authentication is required for both endpoints.
- Customers can retrieve only their own orders.
- Ownership is checked in the service layer.
- A client-supplied order ID does not grant access.
- Admin-wide order retrieval is not implemented in this phase.

## 7. Testing Checklist

- [ ] Retrieve orders with a valid token.
- [ ] Retrieve an individual owned order.
- [ ] Verify an empty order list.
- [ ] Reject requests without authentication.
- [ ] Reject access to another customer's order.
- [ ] Return not found for a nonexistent order.

## 8. Definition of Done

- [ ] Service functions implemented.
- [ ] Controller functions implemented.
- [ ] Authenticated routes registered.
- [ ] Ownership protection tested.
- [ ] Postman tests completed.
- [ ] Documentation saved.
- [ ] Git changes committed.

**Phase status:** Complete after implementation, testing, and documentation have been verified.