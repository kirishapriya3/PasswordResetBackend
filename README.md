# 🔐 Password Reset System (MERN Stack)

A full-stack Password Reset Authentication system built using Node.js, Express, MongoDB Atlas, and React (Vite).

This project implements secure user registration, forgot password, and reset password functionality using email-based token verification.

---

## 🚀 Features

- User Registration with hashed password (bcrypt)
- Secure Reset Token generation (crypto)
- Token expiry (15 minutes)
- Email sending via Nodemailer (Gmail App Password)
- MongoDB Atlas integration
- Frontend–Backend API integration
- Token auto-clear after successful reset

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcrypt
- crypto
- nodemailer
- dotenv

**Frontend**
- React (Vite)
- Axios
- React Router DOM
---

## 🔌 Installation

### Backend
```
cd backend
npm install
npm run dev
```

Runs on:
```
http://localhost:4000
```
FRONTEND
Runs on:
```
http://localhost:5173
```
--RENDER DEPLOYMENT LINK : https://passwordresetbackend-u973.onrender.com
---

## 🔐 API Endpoints

### 1️⃣ Register
POST `/api/auth/register`

```
{
  "username": "testuser",
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

### 2️⃣ Forgot Password
POST `/api/auth/forgot-password`

```
{
  "email": "test@gmail.com"
}
```
--NOW, THE TOKEN WILL BE SENT TO THE MONGODB ATLAS
--COPY AND PASTE THE TOKEN ON BELOW LINK'S token AREA
---

### 3️⃣ Reset Password
POST `/api/auth/reset-password/:token`

```
{
  "password": "newpassword"
}
```
-- NOW, PASSWORD RESET SUCCESSFULLY
---

## 🔄 How you Can Test the Project

### ✅ Step 1: Start Backend
```
cd backend
npm run dev
```

### ✅ Step 2: Start Frontend
```
cd frontend
npm run dev
```

### ✅ Step 3: Test Using Postman

**Register**
```
POST http://localhost:4000/api/auth/register
```

**Forgot Password**
```
POST http://localhost:4000/api/auth/forgot-password
```

Check email for reset link.

**Reset Password**
```
POST http://localhost:4000/api/auth/reset-password/<token>
```

---

## 🔒 Security Highlights

- Password hashing with bcrypt
- Secure random token using crypto
- Expiry-based validation
- Token removal after reset
- Environment variable protection
