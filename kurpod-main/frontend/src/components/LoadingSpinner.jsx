import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  className = '', 
  text = '',
  centered = false 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  const spinner = (
    <svg 
      className={`animate-spin ${sizes[size]} text-blue-600 ${className}`}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  if (centered) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-3">
        {spinner}
        {text && <span className="text-sm text-gray-500">{text}</span>}
      </div>
    );
  }
  
  if (text) {
    return (
      <div className="flex items-center space-x-2">
        {spinner}
        <span className="text-sm text-gray-600">{text}</span>
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;