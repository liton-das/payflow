
---

# Architecture Documentation


# PayFlow — Backend Architecture

## 1. Architecture Style

**PayFlow backend follows a Modular Monolith architecture.**
**The application is deployed as a single application, but the business domains are separated into independent modules.**

---

## 2. Modules

```text
modules/
├── auth/
├── user/
├── product/
├── order/
└── payment/
```
## Each module contains its own:
- Model
- Validation
- Repository
- Service
- Controller
- Route

# 3. Request Flow
```text
Client
  ↓
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
# 4. Responsibility of Each Layer
# Route

### Defines API endpoints and connects them with middleware and controllers.

# Middleware

## Handles cross-cutting concerns such as :

- Authentication
- Authorization
- Validation
- Error-related middleware

# Controller

**Handles HTTP-level responsibilities.**

**It receives the request, calls the service and sends the response.**

# Service

**Contains business logic.**

# Examples :

- Calculate order total
- Validate stock
- Create order
- Process payment
- Apply payment result

# Repository

**Handles database operations.**

# Model

**Defines MongoDB/Mongoose schemas and data structure.**

# 5. Shared Layer
```md
# Shared functionality is placed inside :

shared/
├── middleware/
├── errors/
├── utils/
└── enums/

# Examples :

AppError
Global error handler
catchAsync
sendResponse
JWT utilities
bcrypt utilities
authentication middleware
role middleware
validation middleware
```
# 6. Application Entry Points
# app.js

## Responsible for :

- Creating Express application
- Registering middleware
- Registering routes
- Registering error handlers

# server.js

## Responsible for :

- Loading the application
- Connecting to MongoDB
- Starting the HTTP server

# 7. Dependency Direction

## The preferred dependency flow is :

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Model
```
### Business logic should remain inside the service layer rather than being placed directly inside controllers or routes.