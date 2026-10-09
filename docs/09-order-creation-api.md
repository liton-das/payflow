# Phase 09.4 — Order Creation API

## 1. Overview

The Order Creation API allows an authenticated customer to create an order containing one or more products.

The backend validates the request, verifies product availability and stock, calculates prices, and creates an order with `PENDING` status.

## 2. Endpoint

| Property       | Value                  |
| -------------- | ---------------------- |
| Method         | POST                   |
| Endpoint       | `/api/v1/orders`       |
| Authentication | Required               |
| Authorization  | Authenticated customer |
| Success Status | 201 Created            |

## 3. Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## 4. Request Body

```json
{
  "items": [
    {
      "product": "PRODUCT_OBJECT_ID",
      "quantity": 2
    }
  ]
}
```

The client supplies only the product ID and quantity. The client must not control the order owner, product price, subtotal, total amount, or initial order status.

## 5. Request Processing Flow

1. The authentication middleware verifies the JWT.
2. The validation middleware validates the request body.
3. The controller passes the authenticated user ID and request payload to the Order Service.
4. The Order Service retrieves each product through the Product Repository.
5. The service verifies product existence, active status, and available stock.
6. The backend calculates each item's subtotal and the order total.
7. The Order Repository persists the order.
8. The controller returns a standardized success response.

## 6. Business Rules

* Only authenticated users can create orders.
* Every order must contain at least one item.
* Quantity must be a positive integer.
* Every referenced product must exist and be active.
* Requested quantity must not exceed the currently available stock.
* Product prices and totals are calculated by the backend.
* Product name and unit price are stored as an order-item snapshot.
* Newly created orders start with `PENDING` status.
* Creating an order does not itself confirm successful payment.

## 7. Success Response

HTTP `201 Created`.

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "user": "USER_OBJECT_ID",
    "items": [
      {
        "product": "PRODUCT_OBJECT_ID",
        "name": "Example Product",
        "unitPrice": 10,
        "quantity": 2,
        "subtotal": 20
      }
    ],
    "totalAmount": 20,
    "currency": "USD",
    "status": "PENDING"
  }
}
```

The example is illustrative. MongoDB-generated IDs and timestamps will depend on the actual request.

## 8. Error Cases

| Scenario                          | Expected status |
| --------------------------------- | --------------: |
| Missing or invalid authentication |             401 |
| Invalid request body              |             422 |
| Product not found                 |             404 |
| Inactive product                  |             400 |
| Insufficient stock                |             400 |

An invalidly formatted MongoDB ObjectId may currently produce a Mongoose cast error. The error handler should be improved to return a suitable client error instead of an internal server error.

## 9. Architecture

`Order Route → Authentication Middleware → Validation Middleware → Order Controller → Order Service → Product Repository / Order Repository → MongoDB`

* **Route:** Defines the endpoint and middleware order.
* **Middleware:** Handles authentication and input validation.
* **Controller:** Handles HTTP request and response concerns.
* **Service:** Enforces order business rules and calculates prices.
* **Repository:** Performs database operations.
* **Model:** Defines MongoDB document structure and schema constraints.

## 10. Security and Consistency Notes

* The authenticated user ID is obtained from the verified JWT, not the request body.
* Prices sent by the client are not trusted.
* The frontend success page is not proof of payment.
* Stock is not decremented by the current order-creation implementation.
* Concurrent order requests can create stock-consistency problems until inventory reservation or atomic stock handling is implemented.
* Payment confirmation will be handled separately by the payment module and verified gateway webhook.

## 11. Testing Checklist

* [ ] Create an order with a valid customer token.
* [ ] Reject a request without a token.
* [ ] Reject an invalid quantity.
* [ ] Reject a missing product.
* [ ] Reject an inactive product.
* [ ] Reject a quantity exceeding stock.
* [ ] Confirm the backend calculates the correct total.
* [ ] Confirm the order starts with `PENDING` status.

## 12. Definition of Done

* [ ] Order controller implemented.
* [ ] Order route registered.
* [ ] Authentication and validation middleware applied.
* [ ] Successful order creation verified.
* [ ] Error scenarios tested.
* [ ] Documentation updated.
* [ ] Changes committed to Git.

**Phase status:** Complete only after implementation, testing, and documentation have been verified.
