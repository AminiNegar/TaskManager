# 🚀 Task Manager Full-Stack App

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue.svg" alt="MERN Stack">
  <img src="https://img.shields.io/badge/JWT-Secure-green.svg" alt="JWT Secure">
  <img src="https://img.shields.io/badge/React-18-61dafb.svg" alt="React">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248.svg" alt="MongoDB">
</p>

A comprehensive **Full-Stack Task Management** application. This project features a secure authentication system and organized workflow management using a modern, column-based UI.

---

## ✨ Features

- 🔐 **User Authentication**: Secure Sign-up and Login system using **JWT** (JSON Web Tokens).
- 🛡️ **Data Security**: Industry-standard password encryption using **bcryptjs**.
- 📋 **Full CRUD Operations**:
  - Create, view, and manage your tasks effortlessly.
  - **Privacy First**: Users can only see and interact with their own data.
  - **Status Flow**: Easily move tasks between **To Do**, **Doing**, and **Done**.
  - **Safe Deletion**: Integrated confirmation prompts to prevent accidental data loss.
- 📱 **Modern UI/UX**: 
  - Fully responsive design.
  - Clean layout with **RTL support** optimized for Persian users.
  - Interactive feedback using **SweetAlert2**.

---

## 🛠 Tech Stack

| Frontend | Backend |
| :--- | :--- |
| **React.js** (Hooks & State) | **Node.js** & **Express** |
| **Axios** (API Requests) | **MongoDB** & **Mongoose** |
| **SweetAlert2** (UI Alerts) | **JSON Web Token** (Security) |
| **Modular CSS** | **Bcrypt.js** (Hashing) |

---

## 📂 Project Structure

```bash
├── server/
│   ├── controllers/    # Business logic (Auth & Tasks)
│   ├── models/         # Database schemas (User & Task)
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Security middleware (JWT Protect)
│   └── server.js       # Backend entry point
└── src/
    ├── components/     # React components (TaskColumn, etc.)
    └── App.jsx         # Main logic & State management
🚀 Installation & Setup
1️⃣ Backend Setup
Navigate to the server directory and install dependencies:

Bash
cd server
npm install
Start the backend server:

Bash
npm start
2️⃣ Frontend Setup
Open a new terminal, stay in the root directory and install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
🔒 Data Privacy & Security
Security is the backbone of this application. Every user session is isolated via JWT. The protect middleware extracts the User ID from the token and injects it into every database query, ensuring total data isolation—no user can ever access, edit, or delete another person's tasks.

👤 Developer
Negar Amini
