import { cn } from '../../utils/cn';

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-primary-50 text-primary-700': variant === 'default',
          'bg-success-50 text-success-700': variant === 'success',
          'bg-warning-50 text-warning-700': variant === 'warning',
          'bg-danger-50 text-danger-700': variant === 'danger',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-0.5 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
