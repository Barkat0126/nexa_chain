import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Decode token or fetch user profile if needed
      // For now, we assume token presence is enough or we could fetch profile
      // setUser({ token }); // Simplified
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://nexa-chain-ozlv.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (username, email, password, referralCode) => {
    try {
      // Just register, don't auto-login
      await axios.post('https://nexa-chain-ozlv.onrender.com/api/auth/register', { 
        username, email, password, referralCode 
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration Failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
