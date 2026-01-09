import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function LandingPage() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <img src={viteLogo} className="logo-icon" alt="Nexa Chain Logo" />
          <span>Nexa Chain</span>
        </div>
        <nav className="nav-links">
          <a href="/login">Login</a>
          <a href="/register" className="btn-secondary" style={{padding: '0.5em 1em'}}>Register</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Grow Your Wealth with Nexa Chain</h1>
          <p>
            Secure crypto investment platform with daily ROI and a lucrative 3-level referral system. 
            Start earning passive income today.
          </p>
          <div className="cta-buttons">
            <a href="/register"><button>Start Investing</button></a>
            <button className="btn-secondary">View Plans</button>
          </div>
        </section>

        <section id="features" className="features">
          <div className="card">
            <h3>Daily ROI</h3>
            <p>Earn consistent daily returns on your investments. Track your growth in real-time on our dashboard.</p>
          </div>
          <div className="card">
            <h3>3-Level Referral</h3>
            <p>Invite friends and earn commissions across 3 levels (5%, 3%, 1%). Build your network and maximize earnings.</p>
          </div>
          <div className="card">
            <h3>Secure Platform</h3>
            <p>Your assets are protected with industry-standard security. Fast deposits and automated income distribution.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Nexa Chain. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
