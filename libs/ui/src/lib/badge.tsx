'use client';

import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type TwMainColor =
  | 'pink'
  | 'green'
  | 'yellow'
  | 'red'
  | 'indigo'
  | 'blue'
  | 'purple'
  | 'gray';

export interface BadgeProps {
  className?: string;
  name: ReactNode;
  color?: TwMainColor;
  href?: string;
  size?: 1 | 2 | 3 | 4;
}

export function Badge(props: BadgeProps) {
  const {
    color = 'blue',
    name,
    className = 'relative',
    href,
    size = 2,
  } = props;

  const getColorClass = (hasHover = true) => {
    switch (color) {
      case 'pink':
        return `text-pink-800 bg-pink-100 ${
          hasHover ? 'hover:bg-pink-800' : ''
        }`;
      case 'red':
        return `text-red-800 bg-red-100 ${hasHover ? 'hover:bg-red-800' : ''}`;
      case 'gray':
        return `text-gray-800 bg-gray-100 ${
          hasHover ? 'hover:bg-gray-800' : ''
        }`;
      case 'green':
        return `text-green-800 bg-green-100 ${
          hasHover ? 'hover:bg-green-800' : ''
        }`;
      case 'purple':
        return `text-purple-800 bg-purple-100 ${
          hasHover ? 'hover:bg-purple-800' : ''
        }`;
      case 'indigo':
        return `text-indigo-800 bg-indigo-100 ${
          hasHover ? 'hover:bg-indigo-800' : ''
        }`;
      case 'yellow':
        return `text-yellow-800 bg-yellow-100 ${
          hasHover ? 'hover:bg-yellow-800' : ''
        }`;
      case 'blue':
        return `text-blue-800 bg-blue-100 ${
          hasHover ? 'hover:bg-blue-800' : ''
        }`;
      default:
        return `text-pink-800 bg-pink-100 ${
          hasHover ? 'hover:bg-pink-800' : ''
        }`;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 1:
        return 'text-xs px-1.5 py-0.5';
      case 2:
        return 'text-sm px-2.5 py-1';
      case 3:
        return 'text-base px-3 py-1.5';
      case 4:
        return 'text-lg px-4 py-2';
      default:
        return 'text-sm px-2.5 py-1';
    }
  };

  const CLASSES = 'nc-Badge inline-flex rounded-full font-medium ' + className;

  return !!href ? (
    <Link
      to={href || ''}
      className={`transition-colors hover:text-white duration-300 ${CLASSES} ${getColorClass()} ${getSizeClass()}`}
    >
      {name}
    </Link>
  ) : (
    <span className={`${CLASSES} ${getColorClass(false)} ${getSizeClass()}`}>
      {name}
    </span>
  );
}

export default Badge;
