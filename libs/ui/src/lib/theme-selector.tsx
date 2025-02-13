import React, { useState, useEffect } from 'react';

interface Props {
  uniqueKey: string;
  className?: string;
}

export function ThemeSelector(props: Props) {
  const { uniqueKey, className } = props;

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(`theme-${uniqueKey}`, newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(`theme-${uniqueKey}`) || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [theme, uniqueKey]);

  return (
    <input
      type="checkbox"
      className={`toggle toggle-sm ${className || ''}`}
      onClick={toggleTheme}
      defaultChecked={theme === 'dark'}
    />
  );
}

export default ThemeSelector;
