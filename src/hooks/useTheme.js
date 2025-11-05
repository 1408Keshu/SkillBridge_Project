import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to body class
    document.body.classList.remove('light-mode', 'dark-mode');
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    }
    
    // Update favicon to use SkillBridgeLogo.png
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = '/SkillBridgeLogo.png';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};
