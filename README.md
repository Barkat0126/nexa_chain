# Nexa Chain - Decentralized Investment Platform

Nexa Chain is a robust, full-stack crypto investment platform designed to provide users with secure investment opportunities, daily ROI tracking, and a multi-level referral income system. Built with the **MERN Stack** (MongoDB, Express, React, Node.js), it features a professional, responsive UI and automated background processes for financial calculations.

![Nexa Chain Banner](https://via.placeholder.com/1200x400?text=Nexa+Chain+Platform)

## 🚀 Features

### 🔐 User Authentication
- Secure **Registration** and **Login** flows.
- **JWT (JSON Web Token)** authentication for session management.
- Protected routes to ensure data security.

### 💰 Investment & ROI
- Users can create multiple investment plans.
- **Daily ROI (Return on Investment)** is calculated automatically.
- Real-time tracking of total investment and total income.

### 🤝 Multi-Level Referral System
- **3-Level Affiliate Program**:
  - **Level 1**: 5% Direct Commission
  - **Level 2**: 3% Indirect Commission
  - **Level 3**: 1% Indirect Commission
- Visual **Referral Tree** to track network growth.

### ⚡ Automation (Cron Jobs)
- Automated **Daily Scheduler** (Midnight runs).
- Updates daily ROI for all active investments.
- Distributes level income to uplines automatically.
- Idempotency checks to prevent double calculations.

### 📊 Professional Dashboard
- Responsive **React** frontend.
- Dark mode aesthetic with modern CSS variables.
- Interactive cards for **Total Investments**, **ROI**, and **Referral Earnings**.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), CSS3 (Flexbox/Grid), React Router, Axios, Context API.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js.
- **Scheduler**: Node-cron.

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local instance running on `mongodb://localhost:27017` or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/nexa_chain.git
cd nexa_chain
```

### 2. Backend Setup
Navigate to the server directory, install dependencies, and start the server.

```bash
cd server
npm install
```

**Environment Variables**:
Create a `.env` file in the `server` directory (optional, defaults are set in code):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexa_chain
JWT_SECRET=your_super_secret_key_123
```

Start the server:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, install dependencies, and start the app.

```bash
cd client
npm install
npm run dev
# Client runs on http://localhost:5173
```

---

## 📂 Project Structure

```
nexa_chain/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── context/        # Auth Context API
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── App.jsx         # Main Component
│   │   └── App.css         # Global Styles
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── config/             # DB Connection
│   ├── controllers/        # Business Logic (Auth, Invest)
│   ├── middleware/         # Auth Middleware
│   ├── models/             # Mongoose Schemas (User, Invest)
│   ├── routes/             # API Routes
│   ├── cron.js             # Daily ROI Scheduler
│   └── index.js            # Server Entry Point
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Authenticate user & get token |
| **GET** | `/api/invest/dashboard` | Get user stats (ROI, Income) |
| **POST** | `/api/invest/create` | Create a new investment |
| **GET** | `/api/invest/tree` | Fetch referral hierarchy |

---

## 📅 Automation Logic

The system uses `node-cron` to run a job every day at **00:00 (Midnight)**.

1.  **ROI Calculation**: Iterates through all active investments and adds the daily percentage to the user's ROI balance.
2.  **Level Income**: Checks the referrer tree for each user and distributes 5%, 3%, and 1% commissions to the respective uplines based on daily earnings.
3.  **Database Update**: Uses MongoDB transactions (or atomic updates) to ensure data integrity.

---

## 🛡️ License

This project is licensed under the MIT License.
