import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check localStorage for existing session
    const loggedIn = localStorage.getItem('userLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (loggedIn === 'true' && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const login = async (email, password) => {
    // Demo credentials (in real app, you'd verify with a server)
    const validUsers = [
      { email: 'demo@skillbridge.ai', password: 'password123' },
      { email: 'user@test.com', password: 'test123' },
      { email: 'admin@skillbridge.ai', password: 'admin123' }
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = validUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Store user session
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          setIsLoggedIn(true);
          setUserEmail(email);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return {
    isLoggedIn,
    userEmail,
    login,
    logout
  };
};
