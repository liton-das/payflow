# PayFlow — Authentication

# 1. Overview

**PayFlow uses JWT-based authentication.**

## The authentication module is responsible for:

- User registration
- User login
- Password hashing
- Password verification
- JWT generation
- JWT verification

---

# 2. Registration Flow

```text
Client
  ↓
POST /auth/register
  ↓
Validation
  ↓
Check Existing User
  ↓
Hash Password
  ↓
Create User
  ↓
Generate JWT
  ↓
Return User + Token
```
# 3. Login Flow
```text
Client
  ↓
POST /auth/login
  ↓
Validation
  ↓
Find User
  ↓
Check Account Status
  ↓
Compare Password
  ↓
Generate JWT
  ↓
Return User + Token
```
# 4. Password Security
```text
Passwords are never stored as plain text.

The password is hashed using bcrypt before being stored in MongoDB.

Plain Password
      ↓
bcrypt
      ↓
Hashed Password
      ↓
MongoDB
```
# 5. JWT Authentication

**After successful authentication, the server generates a JWT.**

**The client sends the token using:**

### Authorization: Bearer <token>

**The authentication middleware verifies the token before allowing**
**access to protected resources.**

# 6. Authentication Middleware

## The middleware:

- Reads the Authorization header.
- Checks the Bearer token format.
- Verifies the JWT.
- Stores decoded user information in req.user.
- Allows the request to continue.

# 7. Authentication vs Authorization

## Authentication

**Determines who the user is.**

## Authorization

**Determines what the authenticated user is allowed to do.**

**Authentication is handled before authorization.**

# 8. Security Decisions

## The following decisions are applied:

- Passwords are hashed.
- Password field is hidden from normal queries.
- JWT secret is stored in environment variables.
- Invalid credentials return a generic error message.
- Inactive accounts cannot login.
- Protected resources require a valid JWT.