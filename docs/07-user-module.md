# PayFlow — User Module

## 1. Overview

**The User Module is responsible for managing authenticated user's profile information and user-specific resources.**

**The module follows the Modular Monolith architecture and keeps user-related business logic inside the User domain.**

---

## 2. Responsibilities

## The User Module is responsible for:

- Retrieve current user's profile
- Update current user's profile
- Validate profile update data
- Check email uniqueness
- Return safe user information
- Provide authenticated access to user resources

## The User Module is NOT responsible for:

- Authentication logic
- Password hashing
- JWT generation
- Product business logic
- Order business logic
- Payment business logic
- Admin authorization logic

---

## 3. Module Structure

```text
modules/user/

├── user.model.js
├── user.validation.js
├── user.repository.js
├── user.service.js
├── user.controller.js
└── user.route.js
```
# 4. Request Flow
```text
 Client
  ↓
User Route
  ↓
Auth Middleware
  ↓
Validation Middleware
  ↓
User Controller
  ↓
User Service
  ↓
User Repository
  ↓
User Model
  ↓
MongoDB
```
# 5. Authentication Dependency

**User profile endpoints require authentication.**

## The Auth Middleware verifies the JWT and stores the decoded information inside:
```
req.user
```
## The JWT payload contains:
```
{
  userId,
  role
}
```
## Therefore, the User Module uses:
```
req.user.userId
```
**to identify the currently authenticated user.**
# 6. API Endpoints
### Get My Profile
```
GET /api/v1/users/profile
```
### Authentication:
```
Required
```
### Header:
```
Authorization: Bearer <token>
```
### Response:
```
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "...",
    "name": "Liton",
    "email": "liton@example.com",
    "role": "CUSTOMER"
  }
}
```
## Update My Profile
```
PUT /api/v1/users/profile
```
### Authentication:
```
Required
```
### Example request:
```
{
  "name": "Liton Das"
}
```
### Possible fields:
```
{
  "name": "Liton Das",
  "email": "newemail@example.com"
}
```
# 7. Validation Rules
### Name
- Minimum 2 characters
- Maximum 50 characters
- Optional during profile update
### Email
- Must be a valid email
- Optional during profile update
- Must remain unique
# 8. Business Rules
## Rule 01 — Authentication Required

#### A user must be authenticated before accessing their profile.

## Rule 02 — Own Profile Only

### A user can access and update only their own profile.

### The user ID is obtained from the verified JWT rather than from a request body or URL parameter.

## Rule 03 — Email Uniqueness

### A user cannot update their email to an email address already used by another user.

## Rule 04 — Password Protection

### The password must never be returned as part of the profile response.

## The User model uses:
```
select: false
```
**for the password field.**

---
## Rule 05 — Safe User Response

### Profile responses should contain only required public/user information.
# 9. Layer Responsibilities
## Route Layer

## Responsible for:

- Defining endpoints
- Applying middleware
- Connecting request to controller
## Middleware Layer

## Responsible for:

- Authentication
- Request validation
## Controller Layer

## Responsible for:

- Reading request data
- Calling service
- Sending HTTP response
## Service Layer

## Responsible for:

- Business rules
- Email uniqueness checking
- User-related business decisions
## Repository Layer

## Responsible for:

- Database queries
- Database updates
## Model Layer

## Responsible for:

- MongoDB schema
- Data structure
- Mongoose validation
# 10. Authentication vs User Module

## Authentication answers:

### Who are you?

## The Auth Module handles:
- Registration
- Login
- Password verification
- JWT generation
- JWT verification

## The User Module handles:
```
What user information should be accessed?
```
## For example:
```
Auth Module
    ↓
Verify JWT
    ↓
User Module
    ↓
Get authenticated user's profile
```
# 11. Security Considerations
- JWT must be verified before profile access.
- Password must never be returned.
- Users cannot choose another user's ID from the request.
- Email uniqueness must be checked before update.
- User information returned to clients should be limited.
- Authentication and user management responsibilities remain separated.

# 12. API Summary
```
Method	    Endpoint	            Authentication	    Purpose

GET	        /api/v1/users/profile	Required	        Get own profile
PUT	        /api/v1/users/profile	Required	        Update own profile
```