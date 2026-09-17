
---

# 05 — `docs/05-backend-setup.md`

```md
# PayFlow — Backend Setup

## 1. Backend Technology

The PayFlow backend uses:

- Node.js
- Express.js
- JavaScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- dotenv
- CORS
- cookie-parser

---

# 2. JavaScript Module System

The backend uses ES Modules.

The `package.json` contains:

```json
{
  "type": "commonjs"
}

# This allows the project to use:

export ...

 module.exports

```

# 3. Installed Dependencies

### Runtime Dependencies :

```
- express
- mongoose
- dotenv
- cors
- cookie-parser
- bcryptjs
- jsonwebtoken
- zod
```

# 4. Environment Variables
### The application uses environment variables for configuration.

### Example:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```
**Sensitive values must not be hardcoded into the source code.**


# 5. Environment File Protection

**The project uses .gitignore to prevent sensitive environment files from being committed.**

```
node_modules/
.env
.env.*
!.env.example
npm-debug.log*
.DS_Store
```
**The .env.example file is intentionally allowed to remain in Git.**

**It provides a template for required environment variables without containing real secrets.**


# 6. Configuration Layer

### Environment configuration is handled through:

```
src/config/env.js
```
### Database configuration is handled through:

```
src/config/db.js
```
**This keeps configuration logic separated from business modules.**

# 7. Database Connection

**MongoDB is connected through Mongoose.**

**The database connection is initialized before starting the HTTP server.**

### The startup flow is :

```
server.js
   ↓
connectDB()
   ↓
MongoDB Connected
   ↓
app.listen()
```
**If the database connection fails, the server does not continue
running normally.**

# 8. Express Application

### The Express application is configured inside :
```
src/app.js
```
### Current middleware includes :
```
CORS
JSON body parser
Cookie parser
```
### Routes are mounted under :
```
/api/v1
```

# 9. API Versioning

**PayFlow uses API versioning.**

### Current API prefix:
```
/api/v1
```
### Example:
```
GET /api/v1/health
```
**API versioning makes it possible to introduce future API versions without immediately breaking existing clients.**

# 10. Health Check

### The backend provides a health check endpoint :
```
GET /api/v1/health
```
### Successful response :
**JSON** 
```

{
  "success": true,
  "message": "PayFlow API is healthy"
}
```
**This endpoint is used to verify that the API is running.**

# 11. 404 Handling
**A dedicated 404 middleware handles requests to routes that do not exist.**

### Example :
```
GET /api/v1/unknown
```
### Response :
```
{
  "success": false,
  "message": "Route not found: /api/v1/unknown"
}
```

# 12. Global Error Handling

**PayFlow uses a centralized global error handler.**

**The purpose is to keep error responses consistent across the application.**
## Current error handler supports :
- Custom application status codes
- Error messages
- Centralized error logging
- Default HTTP 500 response

# 13. Development Commands

### Start the development server :
```
npm run dev
```
### Start the application normally :
```
npm start
```
# 14. Current Backend Status

## The current backend foundation includes :

- Express application
- MongoDB connection
- Environment configuration
- API versioning
- Health check endpoint
- 404 middleware
- Global error handler
- Modular Monolith folder structure
- Shared architecture structure
- Authentication-related dependencies
- Validation-related dependency
- Security-related dependencies

**Business modules will be implemented in subsequent phases.**