import React, { ButtonHTMLAttributes, FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'third';
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: LinkProps['to'] | '#';
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  className = '',
  variant = 'primary',
  translate = '',
  sizeClass = 'px-4 py-3 sm:px-6',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick = () => {},
}) => {
  function twFocusClass(hasRing = false) {
    if (!hasRing) {
      return 'focus:outline-none';
    }
    return 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0';
  }

  const variantClasses = {
    primary:
      'bg-primary-6000 hover:bg-primary-700 text-neutral-50 disabled:bg-opacity-70',
    secondary:
      'border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800',
    third:
      'text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700',
  };

  const CLASSES = `
    nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors 
    ${variantClasses[variant]} 
    ${fontSize} 
    ${sizeClass} 
    ${translate} 
    ${className} 
    ${twFocusClass(true)}
  `;

  const _renderLoading = () => (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5"
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
        strokeWidth="3"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  if (!!href && href !== '#') {
    return (
      <Link
        to={href}
        target={targetBlank ? '_blank' : undefined}
        className={CLASSES}
        onClick={onClick}
        rel="noopener noreferrer"
      >
        {loading && _renderLoading()}
        {children || 'This is Link'}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={CLASSES}
      onClick={onClick}
      type={type}
    >
      {loading && _renderLoading()}
      {children || 'This is Button'}
    </button>
  );
};

export default Button;
