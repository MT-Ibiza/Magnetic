'use client';

import React, { FC, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
}

export const Select: FC<SelectProps> = ({
  className = '',
  sizeClass = 'h-11',
  children,
  ...args
}) => {
  return (
    <select
      className={`px-[10px] nc-Select ${sizeClass} ${className} block w-full text-sm rounded-2xl border-[1px] border-neutral-200 focus:border-primary-300 bg-white dark:border-neutral-700 dark:focus:ring-primary-600 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
      {...args}
    >
      {children}
    </select>
  );
};

export default Select;
