'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface ButtonProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'neutral';
  variant?: 'solid' | 'outline';
  translate?: string;
  size?: 1 | 2 | 3 | 4;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: LinkProps['to'] | '#';
  targetBlank?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  radius?: 'none' | 'large' | 'full';
}

export function Button({
  className = '',
  color = 'primary',
  variant = 'solid',
  translate = '',
  size = 2,
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick = () => {},
  radius = 'large',
}: ButtonProps) {
  const sizeClasses = {
    1: 'px-2 py-1 text-xs',
    2: 'px-4 py-3 text-sm',
    3: 'px-6 py-4 text-lg',
    4: 'px-8 py-5 text-xl',
  };

  const fontSizeClasses = {
    1: 'text-xs',
    2: 'text-sm',
    3: 'text-lg',
    4: 'text-xl',
  };

  const colorClasses = {
    primary: {
      solid: 'bg-primary-600 hover:bg-primary-700 text-neutral-50',
      outline:
        'border border-primary-600 text-primary-600 hover:bg-primary-100',
    },
    secondary: {
      solid: 'bg-secondary-600 hover:bg-secondary-700 text-neutral-50',
      outline:
        'border border-secondary-600 text-secondary-600 hover:bg-secondary-100',
    },
    neutral: {
      solid: 'bg-neutral-600 hover:bg-neutral-700 text-neutral-50',
      outline:
        'border border-neutral-600 text-neutral-600 hover:bg-neutral-100',
    },
  };

  const radiusClasses = {
    none: 'rounded-none',
    large: 'rounded-lg',
    full: 'rounded-full',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const twFocusClass = (hasRing = false) => {
    if (!hasRing) {
      return 'focus:outline-none';
    }
    return 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0';
  };

  const sizeClass = sizeClasses[size];
  const fontSizeClass = fontSizeClasses[size];

  const CLASSES = `
    nc-Button relative inline-flex items-center justify-center transition-colors
    ${colorClasses[color][variant]}
    ${fontSizeClass}
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
}

export default Button;
