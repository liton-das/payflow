# PayFlow — Database Design

## 1. Database

PayFlow uses:

- MongoDB
- Mongoose

---

## 2. Collections

The system contains four main collections:

- users
- products
- orders
- payments

---

## 3. User

```text
User
├── _id
├── name
├── email
├── password
├── role
├── isActive
├── createdAt
└── updatedAt