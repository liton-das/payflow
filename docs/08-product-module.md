# Phase 08 — Product Module

## 1. Overview

The Product Module is responsible for managing digital products in the PayFlow application.

This module supports:

- Product creation
- Product listing
- Product details
- Product update
- Product deletion
- Product status management
- Product validation
- Admin-only product management
- Public product browsing

The module follows the PayFlow Modular Monolith architecture.

---

# 2. Module Responsibility

The Product Module is responsible only for product-related business operations.

### Responsibilities

- Create products
- Retrieve products
- Retrieve a single product
- Update products
- Delete products
- Validate product data
- Restrict product management to administrators
- Prevent inactive products from appearing in the public product list

### Not Responsible For

The Product Module does not handle:

- Authentication
- User registration
- User login
- Order creation
- Payment processing
- Payment verification
- Webhooks

These responsibilities belong to their respective modules.

---

# 3. Module Structure

```text
backend/src/modules/product/
├── product.model.js
├── product.validation.js
├── product.repository.js
├── product.service.js
├── product.controller.js
└── product.route.js
```
# 4. Product Data Model

### The Product model contains the following fields:
```
Field	            Type	    Required	Description

_id	                ObjectId	Auto	    Unique product identifier
name	            String	    Yes	        Product name
description	        String	    Yes	        Product description
price	            Number	    Yes	        Product price
image	            String	    No	        Product image URL
stock	            Number	    Yes	        Available stock
status	            String	    No	        Product availability status
createdBy	        ObjectId	Yes	        User who created the product
createdAt	        Date	    Auto	    Creation timestamp
updatedAt	        Date	    Auto	    Last update timestamp
```
# 5. Product Status

### Products support two statuses:
```
ACTIVE
INACTIVE
```
# ACTIVE
### The product is available for customers to view and purchase.

# INACTIVE

### The product is not available for normal public product listing.
# 6. Product Model
```
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
```
# 7. Validation

### Product input is validated using Zod before reaching the controller.

## Create Product Validation
```
export const createProductValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .min(0, "Price cannot be negative"),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  status: z
    .enum(["ACTIVE", "INACTIVE"])
    .optional(),
});
```
# Update Product Validation
```
const updateProductValidationSchema = createProductValidationSchema.partial()
module.exports ={
    createProductValidationSchema,
    updateProductValidationSchema
}
```
# 8. API Endpoints

### Base URL:
```
/api/v1/products
```
### Public APIs
```
| Method | Endpoint               | Authentication | Description         |
| ------ | ---------------------- | -------------- | ------------------- |
| GET    | `/api/v1/products`     | No             | Get active products |
| GET    | `/api/v1/products/:id` | No             | Get product details |
```
# Admin APIs
```
| Method | Endpoint               | Authentication | Role  | Description    |
| ------ | ---------------------- | -------------- | ----- | -------------- |
| POST   | `/api/v1/products`     | Yes            | ADMIN | Create product |
| PUT    | `/api/v1/products/:id` | Yes            | ADMIN | Update product |
| DELETE | `/api/v1/products/:id` | Yes            | ADMIN | Delete product |
```
# 9. Get Products
### Endpoint
```
GET /api/v1/products
```
### Authentication:
```
Not required
```
## Purpose

### Returns products that are currently active.

### The service internally applies:
```
{
  status: "ACTIVE"
}
```
## Example Response
```
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": []
}
```
# 10. Get Product Details
## Endpoint
```
GET /api/v1/products/:id
```
### Authentication:
```
Not required
```
## Example
```
GET /api/v1/products/64f123abc456
```
## Success Response
```
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "64f123abc456",
    "name": "JavaScript Masterclass",
    "description": "Complete JavaScript learning course",
    "price": 49,
    "image": "https://example.com/image.jpg",
    "stock": 10,
    "status": "ACTIVE"
  }
}
```
## Product Not Found
```
{
  "success": false,
  "message": "Product not found"
}
```
# 11. Create Product
### Endpoint
```
POST /api/v1/products
```
### Authentication:
```
Required
```
### Role:
```
ADMIN
```
## Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```
## Request Body
```
{
  "name": "JavaScript Masterclass",
  "description": "Complete JavaScript learning course",
  "price": 49,
  "image": "https://example.com/image.jpg",
  "stock": 10,
  "status": "ACTIVE"
}
```
## Success Response
```
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64f123abc456",
    "name": "JavaScript Masterclass",
    "description": "Complete JavaScript learning course",
    "price": 49,
    "image": "https://example.com/image.jpg",
    "stock": 10,
    "status": "ACTIVE",
    "createdBy": "64f123user123"
  }
}
```
# 12. Update Product
## Endpoint
```
PUT /a`pi/v1/products/:id
```
**Authentication:**
```
Required
```
**Role:**
```
ADMIN
```
## Request Body
```
{
  "price": 59,
  "stock": 20
}
```
**Only the fields that need to be changed have to be provided.**

## Success Response
```
{
  "success": true,
  "message": "Product updated successfully",
  "data": {}
}
```
# 13. Delete Product
## Endpoint
```
DELETE /api/v1/products/:id
```
### Authentication:
```
Required
```
## Role:
```
ADMIN
```
## Success Response
```
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {}
}
```
# 14. Authentication & Authorization

**The Product Module uses two security layers.**

## Authentication

**Handled by:**
```
authMiddleware
```
### It verifies the JWT token and attaches the decoded user information to:
```
req.user
```
## Example:
```
req.user = {
  userId: "...",
  role: "ADMIN"
};
```
## Authorization

### Handled by:
```
roleMiddleware
```
### Admin-only routes use:
```
roleMiddleware("ADMIN")
```
## Therefore:
```text
Customer
   ↓
Authenticated
   ↓
roleMiddleware
   ↓
403 Access Denied

While:

Admin
   ↓
Authenticated
   ↓
roleMiddleware("ADMIN")
   ↓
Allowed
```
# 15. RBAC Flow
```text
Request
   ↓
authMiddleware
   ↓
JWT Verification
   ↓
req.user
   ↓
roleMiddleware("ADMIN")
   ↓
Is user ADMIN?
   ├── No → 403 Access Denied
   └── Yes
        ↓
   Validation
        ↓
   Controller
        ↓
   Service
        ↓
   Repository
        ↓
   Database
   ```
# 16. Layer Responsibilities

**The Product Module follows the standard PayFlow layered architecture.**
```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
MongoDB
```
## Route

### Responsible for:

- Endpoint definition
- Middleware ordering
- Authentication
- Authorization
- Validation
## Controller

### Responsible for:

- Reading request data
- Calling service methods
- Returning HTTP responses

**The controller should not contain business logic.**

## Service

### Responsible for:

- Product business logic
- Product existence checks
- Preparing data for repository operations
## Repository

### Responsible for:

- MongoDB operations
- Product queries
- Product creation
- Product updates
- Product deletion
## Model

### Responsible for:

- MongoDB schema
- Field validation
- Relationships
- Database structure
# 17. Repository Operations

### The Product Repository provides:
```
createProduct()
findAllProducts()
findProductById()
updateProductById()
deleteProductById()
```
**These methods isolate database operations from business logic.**
# 18. Business Rules

### The Product Module follows these rules:

- Only authenticated administrators can create products.
- Only authenticated administrators can update products.
- Only authenticated administrators can delete products.
- Customers can browse products without authentication.
- Public product listing returns only ACTIVE products.
- Product price cannot be negative.
- Product stock cannot be negative.
- Product stock must be an integer.
- Product name must contain at least 2 characters.
- Product description must contain at least 10 characters.
- Product status can only be ACTIVE or INACTIVE.
- Every product must have a createdBy user reference.
# 19. Security Considerations

## The Product Module uses:
- JWT authentication
- Role-based authorization
- Zod request validation
- Mongoose validation
- Admin-only write operations
- Controlled request data
- Centralized error handling

**The backend does not trust the client for authorization.**

## For example, sending:
```
{
  "role": "ADMIN"
}
```
**from a customer request does not make the user an admin.**

**The role comes from the authenticated user's JWT/database state.**
# 20. Error Handling

### Common errors include:

## 401 Unauthorized
```
Authentication required
```
*Occurs when the request does not contain a valid authentication token.*

## 403 Forbidden
```
Access denied
```
*Occurs when an authenticated user does not have the required role.*

## 404 Not Found
```
Product not found
```
*Occurs when the requested product does not exist.*

## 422 Validation Error

*Occurs when request data does not satisfy the Zod validation schema.*
# 21. Testing Checklist

*The following cases should be tested through Postman.*

## Public APIs
 - Get active products
 - Get product by ID
 - Get non-existing product
## Admin APIs
 - Admin can create product
 - Admin can update product
 - Admin can delete product
## Authorization
 - Customer cannot create product
 - Customer cannot update product
 - Customer cannot delete product
 - Unauthenticated user cannot access admin APIs
## Validation
 - Missing product name
 - Invalid product name
 - Negative price
 - Negative stock
 - Decimal stock
 - Invalid image URL
 - Invalid product status
## Product Status
 - ACTIVE product appears in public list
 - INACTIVE product does not appear in public list
 # 22. Important Architecture Decision

**The Product Module does not directly handle orders or payments.**

## For example:
```text
Product Module
      │
      │ product information
      ↓
Order Module
      │
      │ order information
      ↓
Payment Module
```
*Each module owns its own business responsibility.*

*This keeps the Modular Monolith maintainable and makes future extraction into separate services easier if the application grows.*