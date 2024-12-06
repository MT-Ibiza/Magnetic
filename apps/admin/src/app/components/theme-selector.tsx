import React, { useState, useEffect } from 'react';

const ThemeSelector = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [theme]);

  return (
    <input
      type="checkbox"
      className="toggle toggle-sm"
      onClick={toggleTheme}
      defaultChecked
    />
  );
};

export default ThemeSelector;
