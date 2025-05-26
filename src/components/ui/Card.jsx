import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'card-hover rounded-xl border border-gray-200 bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }) {
  return (
    <div className={cn('flex items-center justify-between p-6 pb-4', className)}>
      {children}
    </div>
  );
};

Card.Content = function CardContent({ children, className }) {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        'border-t border-gray-200 bg-gray-50/50 px-6 py-4 rounded-b-xl',
        className
      )}
    >
      {children}
    </div>
  );
};
