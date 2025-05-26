import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names intelligently by merging Tailwind classes.
 * @param  {...any} inputs - List of class names or conditional class objects.
 * @returns {string} - Merged class names string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
