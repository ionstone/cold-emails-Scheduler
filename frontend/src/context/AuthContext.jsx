import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up axios default header
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      console.log('Attempting login to:', `${import.meta.env.VITE_BASE_URL}/api/auth/login`);
      const response = await api.post('/api/auth/login', {
        email,
        password
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      return true;
    } catch (error) {
      console.error('Login error:', error.response || error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error occurred');
    }
  };

  const register = async (email, password) => {
    try {
      console.log('Attempting registration to:', `${import.meta.env.VITE_BASE_URL}/api/auth/register`);
      const response = await api.post('/api/auth/register', {
        email,
        password
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      return true;
    } catch (error) {
      console.error('Registration error:', error.response || error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error occurred');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 