import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from '@nextui-org/react';

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const ThemeToggle = ({ className = "", ...props }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="light"
      size="sm"
      isIconOnly
      onClick={toggleTheme}
      className={`relative ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      {...props}
    >
      <SunIcon className={`h-5 w-5 transition-all duration-300 ${
        theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
      }`} />
      <MoonIcon className={`absolute h-5 w-5 transition-all duration-300 ${
        theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;