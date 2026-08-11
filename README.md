# 🌌 The Labyrinth

> **Turn complex goals into explorable, visual decision networks.**

[![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg?logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg?logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black.svg?logo=vercel)](https://vercel.app)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**The Labyrinth** is a full-stack MERN application that enables users to map out multi-step learning journeys, career transitions, and complex decision-making processes into interactive visual graphs.

🔗 **Live Application**: [labyrinth-client.vercel.app](https://labyrinth-client.vercel.app)  
📡 **API Service**: [labyrinth-server.vercel.app](https://labyrinth-server.vercel.app)

---

## ✨ Features

- 🕸️ **Interactive Graph Editor**: Drag-and-drop node placement, custom connections, step types, descriptions, and learning resource links powered by React Flow.
- 🔐 **Dual Auth Architecture**: Secure JWT authentication supporting both HTTP-only cookies and Bearer token fallback for seamless cross-origin deployment.
- 🚀 **Curated Demo Roadmaps**: Instantly explore pre-seeded roadmaps including *Learn MERN*, *Study Abroad*, *Build a Startup*, and *Switch Careers*.
- 🎨 **Aesthetic Dark Mode Interface**: Built with Tailwind CSS, Framer Motion animations, and a dynamic Starfield canvas backdrop.
- 🛠️ **CLI Data Seeding**: Built-in script for seeding demo users, node structures, and graph relationships automatically.

---

## 🛠️ Tech Stack

### **Frontend (`client/`)**
- **Core**: React 18, Vite
- **Graph Engine**: React Flow (`@xyflow/react`)
- **Styling & Motion**: Tailwind CSS, Framer Motion (`motion/react`), Lucide Icons
- **Validation & Routing**: Zod, React Router v7

### **Backend (`server/`)**
- **Runtime & Framework**: Node.js, Express.js
- **Database & ORM**: MongoDB Atlas, Mongoose
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `cookie-parser`
- **Deployment**: Vercel Serverless Functions

---

## 📁 Repository Structure

```text
The-Labyrinth/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI Components & Starfield canvas
│   │   ├── context/        # Auth Context & API client state
│   │   ├── pages/          # Landing, Dashboard, & Graph Editor pages
│   │   └── lib/            # Zod validation schemas
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express Backend API
│   ├── config/             # Database connection setup
│   ├── middleware/         # JWT authentication middleware
│   ├── models/             # Mongoose schemas (User, Path, Node)
│   ├── routes/             # Auth & Path API endpoints
│   ├── scripts/            # CLI database seed scripts
│   ├── index.js            # Express app & Vercel serverless entry
│   └── vercel.json         # Vercel routing configuration
│
└── README.md
```

---

## 🚀 Quick Start (Local Setup)

### **Prerequisites**
- Node.js (v18+)
- MongoDB Atlas cluster URI (or local MongoDB server)

### **1. Clone the Repository**
```bash
git clone https://github.com/mahnoorsaeed7/The-Labyrinth.git
cd The-Labyrinth
```

### **2. Setup & Run Backend**
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Labyrinth
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Seed initial demo paths (optional):
```bash
npm run seed
```

Start the development server:
```bash
npm run dev
```

### **3. Setup & Run Frontend**
In a new terminal tab:
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & receive token | ❌ |
| `POST` | `/api/auth/logout` | Clear authentication session | ❌ |
| `GET` | `/api/auth/me` | Fetch authenticated user details | ✅ |
| `GET` | `/api/paths` | Fetch user paths + public demo paths | ✅ |
| `POST` | `/api/paths` | Create a new path graph | ✅ |
| `GET` | `/api/paths/:id` | Fetch specific path graph & nodes | ✅ |
| `PUT` | `/api/paths/:id` | Update nodes & edges for a path | ✅ |
| `GET` | `/api/health` | Service health check | ❌ |

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
