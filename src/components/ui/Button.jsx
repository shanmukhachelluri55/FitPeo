import { cn } from '../../utils/cn';

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'button-hover inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-lg shadow-primary-500/25': variant === 'primary',
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300': variant === 'secondary',
          'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100': variant === 'outline',
          'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200': variant === 'ghost',
          'text-primary-600 underline-offset-4 hover:text-primary-700 hover:underline': variant === 'link',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {isLoading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
