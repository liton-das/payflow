# PayFlow — Requirements Documentation

## 1. Project Overview

PayFlow is a small professional digital product store.

The main purpose of the project is to build a secure and scalable
backend system for digital product purchasing with authentication,
order management and online payment processing.

The project follows a Modular Monolith architecture.

---

## 2. Actors

### Customer

A customer can:

- Register an account
- Login
- View products
- Purchase products
- Create orders
- Make payments
- View own orders
- View own payments
- View and update own profile

### Admin

An admin can:

- Manage products
- View orders
- View payments
- Access administrative resources

---

## 3. Functional Requirements

### Authentication

- User registration
- User login
- User logout
- Get authenticated user information
- JWT-based authentication

### Product

- View products
- View single product
- Create product
- Update product
- Delete product
- Manage product status
- Manage product stock

### Order

- Create order
- View own orders
- View single order
- Calculate order total on the backend
- Store product price snapshot
- Maintain order status

### Payment

- Create payment
- Process payment through payment gateway
- Handle payment gateway webhook
- Verify payment on the backend
- Maintain payment status
- Prevent duplicate payment processing

### Admin

- Manage products
- View all orders
- View all payments

---

## 4. Business Rules

1. Inactive products cannot be purchased.
2. Requested quantity cannot exceed available stock.
3. Product price must be calculated on the backend.
4. Frontend-submitted total must not be trusted.
5. Order stores the product price at the time of purchase.
6. A successful payment must not be processed twice.
7. Duplicate webhook events must be handled safely.
8. Customers can access only their own orders and payments.
9. Administrative operations require admin authorization.
10. Payment status must be confirmed by the verified payment gateway webhook.

---

## 5. Security Requirements

- Passwords must be hashed.
- JWT must be used for authentication.
- Protected resources require authentication.
- Admin resources require proper authorization.
- Request data must be validated.
- Payment webhook must be verified.
- Sensitive environment variables must not be committed to Git.

---

## 6. MVP Scope

### Included

- Authentication
- User
- Product
- Order
- Payment
- Admin capabilities

### Out of Scope

- Coupon system
- Cart
- Wishlist
- Chat
- Notifications
- Subscription
- Multiple payment gateways
- Multiple currencies
- Redis
- Kafka
- Microservices
- Analytics
- Refund UI