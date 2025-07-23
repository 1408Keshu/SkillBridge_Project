import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn');
    const email = localStorage.getItem('userEmail');
    const storedToken = localStorage.getItem('token');
    if (loggedIn === 'true' && email && storedToken) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setToken(storedToken);
    }
    setLoading(false); // <-- Add this line
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.name); // <-- Add this line
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUserEmail(user.email);
      setToken(token);
      return user;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail('');
    setToken('');
  };

  const value = {
    isLoggedIn,
    userEmail,
    token,
    login,
    logout,
    loading, // <-- Add this
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
