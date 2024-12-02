import React, { ButtonHTMLAttributes, FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface ButtonProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'neutral';
  variant?: 'solid' | 'outline';
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
  radius?: 'none' | 'large' | 'full';
}

const Button: FC<ButtonProps> = ({
  className = '',
  color = 'primary',
  variant = 'solid',
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
  radius = 'none',
}) => {
  function twFocusClass(hasRing = false) {
    if (!hasRing) {
      return 'focus:outline-none';
    }
    return 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0';
  }

  const colorClasses = {
    primary: {
      solid: 'bg-primary-6000 hover:bg-primary-700 text-neutral-50',
      outline:
        'border border-primary-6000 text-primary-6000 hover:bg-primary-100',
    },
    secondary: {
      solid: 'bg-secondary-6000 hover:bg-secondary-700 text-neutral-50',
      outline:
        'border border-secondary-6000 text-secondary-6000 hover:bg-secondary-100',
    },
    neutral: {
      solid: 'bg-neutral-6000 hover:bg-neutral-700 text-neutral-50',
      outline:
        'border border-neutral-6000 text-neutral-6000 hover:bg-neutral-100',
    },
  };

  const radiusClasses = {
    none: 'rounded-none',
    large: 'rounded-lg',
    full: 'rounded-full',
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const CLASSES = `
    nc-Button relative h-auto inline-flex items-center justify-center transition-colors 
    ${colorClasses[color][variant]} 
    ${fontSize} 
    ${sizeClass} 
    ${translate} 
    ${className} 
    ${twFocusClass(true)}
    ${radiusClasses[radius]}
    ${disabledClasses}
  `;

  if (!!href && href !== '#') {
    return (
      <Link
        to={href}
        target={targetBlank ? '_blank' : undefined}
        className={CLASSES}
        onClick={onClick}
        rel="noopener noreferrer"
      >
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
      {children || 'This is Button'}
    </button>
  );
};

export default Button;
