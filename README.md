# 🔐 Backend Auth Mastery

> 🚀 A complete backend authentication playground implementing **Session-based Authentication**, **JWT Authentication**, and **OAuth (coming soon)** using Node.js, Express, and MongoDB.

---

## 🎯 Purpose of This Repository

This repository is designed to **master backend authentication systems** by implementing and comparing:

- 🧠 How authentication works internally
- 🔐 Security trade-offs of each approach
- 🏗️ Production-ready backend patterns

> 💡 This is not a tutorial repo — it’s a **learning + demonstration project**.

---

## 🧭 Authentication Roadmap

Session Authentication ✅
↓
JWT Authentication ✅
↓
OAuth (Google/GitHub) 🔜

yaml
Copy code

Each auth method is implemented in **separate modules** with clean structure and real-world practices.

---

## 🧩 Tech Stack

| Layer | Technology |
|------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Auth | Sessions, JWT, OAuth |
| Security | bcrypt, jsonwebtoken |
| Tools | dotenv, nodemon |

---

## 🗂️ Repository Structure

```text
backend-auth-mastery/
│
├── session-auth/          # Session & Cookie based auth
│   ├── server.js
│   ├── app.js
│   ├── models/
│   ├── routes/
│   └── config/
│
├── jwt-auth/              # JWT (Access + Refresh token)
│   ├── server.js
│   ├── app.js
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
│
├── oauth-auth/            # OAuth (Google/GitHub) [Coming Soon]
│
└── README.md
