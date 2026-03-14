# 🎵 Spotify Microservices Clone

A full-stack **Spotify Clone** built using a **Microservices Architecture**.
This project demonstrates scalable backend services, modern frontend development, and containerized deployment using Docker.

---

## 🚀 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS

### Backend (Microservices)

* Node.js
* Express.js
* TypeScript

### Databases

* PostgreSQL – Album & Song Service
* MongoDB – User Service
* Redis – Caching & session management

### DevOps

* Docker
* Docker Compose
* Cloud deployment (Render / Vercel)

---

## 🧩 Microservices Architecture

This project is divided into independent services:

### 1️⃣ User Service

Handles:

* User authentication
* User profile
* Playlist management

**Database:** MongoDB

---

### 2️⃣ Admin Service

Handles:

* Album creation
* Song upload
* Album & song management

**Database:** PostgreSQL

---

### 3️⃣ Media & Cache

* Cloudinary for media storage
* Redis for caching and performance

---

## 📂 Project Structure

```
spotify/
│
├── frontend/          # React + Vite frontend
│
├── admin-service/     # Album & Song service
│
├── user-service/      # Authentication & users
│
├── docker-compose.yml
│
└── README.md
```

---

## ⚙️ Features

* 🎧 Play songs
* 📀 Album management
* ❤️ Playlist system
* 🔐 Authentication
* ⚡ Redis caching
* ☁️ Cloudinary media storage
* 🐳 Dockerized microservices
* 📦 REST APIs

---

## 🐳 Docker Setup

Run the entire project using Docker:

```bash
docker-compose up --build
```

This will start:

* Frontend
* User Service
* Admin Service
* PostgreSQL
* MongoDB
* Redis

---

## 🔑 Environment Variables

Create `.env` files inside services.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_uri
DATABASE_URL=your_postgresql_url
REDIS_PASSWORD=your_redis_password
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

---

## 📦 Installation (Local Development)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/spotify-microservices.git
```

### 2️⃣ Install dependencies

```
cd frontend
npm install

cd ../admin-service
npm install

cd ../user-service
npm install
```

### 3️⃣ Run the services

```
npm run dev
```

---

## 🌍 Deployment

Frontend deployed on **Vercel**

Backend services deployed on **Render**

Databases:

* MongoDB Atlas
* PostgreSQL
* Redis Cloud

---

## 📸 Screenshots

* Home Page
* Album Page
* Admin Dashboard
* Playlist
* Login
* Register


---

## 📚 Learning Highlights

This project demonstrates:

* Microservices architecture
* Docker containerization
* Multi-database architecture
* Scalable backend services
* Modern React development

---

## 👨‍💻 Author

**Mohd Shoyab**

Full Stack Developer

---

⭐ If you like this project, consider giving it a star!
