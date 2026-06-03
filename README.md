# VillageConnect

VillageConnect is an e-commerce platform that enables online selling of clothes and grocery products while connecting villages with nearby rural and urban markets to support local sellers and improve rural accessibility.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- npm

---

## 📦 Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/nishant1683/Village-Connect.git
cd VillageConnect
```

---

### 2. Run the Server (Backend)

```bash
cd server
npm install
npm run dev
```

> The server runs on `http://localhost:5000` by default using **nodemon** for hot-reload.
> For production: use `npm start` instead.

---

### 3. Run the Client (Frontend)

Open a **new terminal**, then:

```bash
cd client
npm install
npm run dev
```

> The client runs on `http://localhost:5173` by default (Vite dev server).

---

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase anon/service key |
| `JWT_SECRET` | Secret key for JWT tokens |
| `CLOUDINARY_*` | Cloudinary credentials for image uploads |
| `RAZORPAY_*` | Razorpay API keys for payments |

### Client (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Auth | JWT, bcryptjs |
| Payments | Razorpay |
| Media | Cloudinary |
