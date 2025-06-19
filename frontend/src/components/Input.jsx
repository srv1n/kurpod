import React from 'react';
import { cn } from '../lib/utils';

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-ring/50 focus:shadow-lg",
          error && "border-destructive hover:border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
})
Input.displayName = "Input"

export default Input;