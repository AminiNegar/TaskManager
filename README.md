🚀 Task Manager Full-Stack App
A comprehensive Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a secure authentication system and organized task management using a column-based UI.
✨ Features
•	User Authentication: Secure Sign-up and Login using JWT (JSON Web Tokens).
•	Data Security: Passwords are encrypted using bcryptjs before being stored.
•	Full CRUD Operations:
o	Create new tasks.
o	View personalized task lists (users only see their own data).
o	Update task status (Todo, Doing, Done).
o	Delete tasks with a confirmation prompt.
•	Modern UI: Responsive design with a clean layout and RTL support for Persian users.
•	Interactive Feedback: Integrated SweetAlert2 for beautiful alerts and notifications.
🛠 Tech Stack
Frontend
•	React.js: For building the interactive user interface.
•	Axios: For making API requests to the backend.
•	SweetAlert2: For stylish popup notifications and confirmation dialogs.
•	Inline CSS: Modular styling within components.
Backend
•	Node.js & Express: For building the server and RESTful API.
•	MongoDB & Mongoose: NoSQL database for flexible data storage.
•	JSON Web Token (JWT): For managing user sessions and endpoint protection
🚀 Installation & Setup
1. Backend Setup
Navigate to the server directory and install dependencies:
Bash
cd server
npm install
Start the backend server:
Bash
npm start
2. Frontend Setup
In a new terminal, stay in the root directory and install dependencies:
Bash
npm install
Start the development server:
Bash
npm run dev
📂 Project Structure
Plaintext
├── server/
│   ├── controllers/    # Business logic (Auth & Tasks)
│   ├── models/         # Database schemas (User & Task)
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Security middleware (Protect)
│   └── server.js       # Backend entry point
└── src/
    ├── components/     # React components (TaskColumn, etc.)
    └── App.jsx         # Main application logic and state management
🔒 Data Privacy & Security
Security is a core part of this app. Every user is isolated; the protect middleware extracts the User ID from the JWT token and applies it to every database query. This ensures that no user can access, edit, or delete another user's tasks.
________________________________________
👤 Developer: Negar Amini

