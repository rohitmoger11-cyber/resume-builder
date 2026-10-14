# AI Resume Builder 🚀

A full-stack AI-powered Resume Builder that helps users create professional resumes, choose from multiple templates, optimize their resumes using AI, and share their resumes through a live online link.

---

## 📌 Project Overview

The AI Resume Builder is a full-stack web application built using the MERN stack.

It allows users to create, manage, customize, and share professional resumes. The application also provides AI-powered features to improve resume content and optimize resumes based on the user's information.

Users can create multiple resumes, select different templates, upload profile images, remove image backgrounds, and share their completed resume using a live public URL.

---

## ✨ Features

### 👤 User Authentication
- User Sign Up and Sign In
- JWT-based authentication
- Secure password hashing using Bcrypt
- Protected routes

### 📄 Resume Management
- Create a new resume
- Edit existing resumes
- Delete resumes
- Manage multiple resumes
- Live resume preview
- Resume sharing through a public URL

### 🤖 AI-Powered Features
- Generate professional resume content
- Improve existing resume descriptions
- Optimize resume content
- AI-powered professional summary generation
- Resume optimization suggestions

### 🎨 Resume Templates
- Multiple professional resume templates
- Live preview while editing
- Responsive resume layouts

### 🖼️ Image Management
- Upload profile images
- Image management using ImageKit
- Remove image backgrounds

### 🔐 Security
- JWT authentication
- Bcrypt password hashing
- Protected API routes
- Environment variables for sensitive credentials

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Lucide React
- React Hot Toast
- React PDFToText

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer

### AI & Cloud Services

- OpenAI / Generative AI
- ImageKit
- MongoDB Atlas

### Development Tools

- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ Project Structure

```text
resume-builder/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
