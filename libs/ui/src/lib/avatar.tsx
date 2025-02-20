'use client';

import React from 'react';

export interface AvatarProps {
  containerClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  radius?: string;
  imgUrl?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
  bgColor?: string;
}

const avatarColors = [
  '#ffdd00',
  '#fbb034',
  '#ff4c4c',
  '#c1d82f',
  '#f48924',
  '#7ac143',
  '#30c39e',
  '#06BCAE',
  '#0695BC',
  '#037ef3',
  '#146eb4',
  '#8e43e7',
  '#ea1d5d',
  '#fc636b',
  '#ff6319',
  '#e01f3d',
  '#a0ac48',
  '#00d1b2',
  '#472f92',
  '#388ed1',
  '#a6192e',
  '#4a8594',
  '#7B9FAB',
  '#1393BD',
  '#5E13BD',
  '#E208A7',
];

export { avatarColors };

export function Avatar({
  containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
  size = 'md',
  radius = 'rounded-full',
  imgUrl = '',
  userName,
  hasChecked,
  hasCheckedClass = 'w-4 h-4 -top-0.5 -right-0.5',
  bgColor = '#ad023b',
}: AvatarProps) {
  const url = imgUrl || '';
  const name = userName || 'John Doe';

  const _setBgColor = (name: string) => {
    return (
      bgColor ||
      avatarColors[Math.floor(name.charCodeAt(0) % avatarColors.length)]
    );
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    const firstName = names[0] || '';
    const secondName = names[1] || '';
    return `${firstName[0] || ''}${secondName[0] || ''}`.toUpperCase();
  };

  const getInitialsFontSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-lg';
      case 'lg':
        return 'text-2xl';
      case 'xl':
        return 'text-3xl';
      case '2xl':
        return 'text-4xl';
      case '3xl':
        return 'text-5xl';
      default:
        return 'text-base';
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8';
      case 'md':
        return 'h-16 w-16';
      case 'lg':
        return 'h-24 w-24';
      case 'xl':
        return 'h-32 w-32';
      case '2xl':
        return 'h-40 w-40';
      case '3xl':
        return 'h-48 w-48';
      default:
        return 'h-12 w-12';
    }
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${getSizeClass(
        size
      )} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url ? (
        <img
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={url}
          alt={name}
        />
      ) : (
        <span className={`wil-avatar__name ${getInitialsFontSize(size)}`}>
          {getInitials(name)}
        </span>
      )}

      {hasChecked && (
        <span
          className={`bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute ${hasCheckedClass}`}
        >
          <i className="las la-check"></i>
        </span>
      )}
    </div>
  );
}

export default Avatar;
