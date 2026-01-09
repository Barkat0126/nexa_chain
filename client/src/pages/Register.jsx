import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    referralCode: ''
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(
      formData.username, 
      formData.email, 
      formData.password, 
      formData.referralCode
    );
    if (result.success) {
      alert('Register Successful! Please Sign In.');
      navigate('/login');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label>Username</label>
          <input 
            name="username" 
            onChange={handleChange} 
            required 
            autoComplete="off"
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            name="email" 
            type="email" 
            onChange={handleChange} 
            required 
            autoComplete="off"
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            name="password" 
            type="password" 
            onChange={handleChange} 
            required 
            autoComplete="new-password"
          />
        </div>
        <div>
          <label>Referral Code (Optional)</label>
          <input 
            name="referralCode" 
            onChange={handleChange} 
            autoComplete="off"
          />
        </div>
        <button type="submit">Register</button>
        <div style={{ marginTop: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem' }}>
            Already have an account? Login
          </Link>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>
            &larr; Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
