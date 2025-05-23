import React from 'react';
import { Button } from "@/components/ui/button";

function GlobalMessages({ error, message, setError, setMessage }) {
  if (!error && !message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-xs w-full">
      {error && (
        <div className="p-3 bg-danger/20 backdrop-blur-sm text-danger rounded-lg shadow-lg text-sm border border-danger/30 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
          <Button isIconOnly size="sm" variant="light" onClick={() => setError('')} className="ml-auto text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg>
          </Button>
        </div>
      )}
      {message && (
        <div className="p-3 bg-success/20 backdrop-blur-sm text-success rounded-lg shadow-lg text-sm border border-success/30 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-4.293a1 1 0 00-1.414-1.414l-3-3a1 1 0 10-1.414 1.414l3.5 3.5a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L10 12.586l-1.707-1.707z" clipRule="evenodd" />
          </svg>
          <span>{message}</span>
          <Button isIconOnly size="sm" variant="light" onClick={() => setMessage('')} className="ml-auto text-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

export default GlobalMessages; 