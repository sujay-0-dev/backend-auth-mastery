# 🚀 JWT-Based Secure To-Do Backend API

> 🧠 *A production-ready To-Do backend built with modern authentication, clean architecture, and security best practices.*

---

## 🎮 Project Status
🟢 **Auth Implemented**  
🟢 **JWT + Refresh Tokens**  
🟢 **Secure CRUD APIs**  
🟢 **MongoDB Atlas Connected**  
🟢 **Production-Ready Structure**

---

## ✨ Features (Level Up Your Productivity)

🔐 **JWT Authentication**
- Access Token & Refresh Token
- Stateless & scalable auth
- Secure route protection via middleware

📝 **To-Do Management**
- Create, Read, Update, Delete todos
- Each user sees only their own data
- Ownership-based authorization

🛡️ **Security First**
- Password hashing with bcrypt
- Token expiration handling
- Protected routes
- Environment-based secrets

🏗️ **Clean Architecture**
- Modular folder structure
- Separation of concerns
- Easy to extend (roles, permissions, frontend)

---

## 🧩 Tech Stack

| Layer | Technology |
|------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (Access + Refresh) |
| Security | bcrypt, jsonwebtoken |
| Tools | Nodemon, dotenv |

---

## 🗂️ Project Structure

```text
backend/
│
├── server.js
├── app.js
│
├── config/
│   └── db.js
│
├── models/
│   ├── user.js
│   └── todo.js
│
├── routes/
│   ├── auth.routes.js
│   └── todo.routes.js
│
├── middlewares/
│   └── requireJwtAuth.js
│
├── utils/
│   └── jwt.js
│
├── .env
└── package.json
🔐 Authentication Flow (How the Magic Works)
pgsql
Copy code
Register / Login
      ↓
JWT Issued (Access + Refresh)
      ↓
Client sends Access Token
      ↓
Middleware verifies token
      ↓
Protected API access granted 🎉
🧪 API Endpoints
🔑 Auth
bash
Copy code
POST   /api/auth/register-jwt
POST   /api/auth/login-jwt
POST   /api/auth/refresh-token
📝 To-Dos (JWT Protected)
bash
Copy code
GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id