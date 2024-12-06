import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  radius?: 'none' | 'large' | 'full';
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'text-sm font-normal',
      radius = 'large',
      children,
      type = 'text',
      ...args
    },
    ref
  ) => {
    const radiusClasses = {
      none: 'rounded-none',
      large: 'rounded-lg',
      full: 'rounded-full',
    };

    return (
      <input
        ref={ref}
        type={type}
        className={`input input-bordered
          ${radiusClasses[radius]}
          ${fontClass}
          ${sizeClass}
          ${className}`}
        {...args}
      />
    );
  }
);

export default Input;
