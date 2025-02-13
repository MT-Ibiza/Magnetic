'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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

    const [visiblePassword, setVisiblePassword] = useState(false);

    return (
      <>
        {type === 'password' ? (
          <div className="input input-bordered flex items-center gap-2">
            <input
              ref={ref}
              type={visiblePassword ? 'text' : 'password'}
              className="grow"
              placeholder="********"
              {...args}
            />
            {visiblePassword ? (
              <FiEye
                className="cursor-pointer"
                onClick={() => {
                  setVisiblePassword((prevState) => !prevState);
                }}
              />
            ) : (
              <FiEyeOff
                className="cursor-pointer"
                onClick={() => {
                  setVisiblePassword((prevState) => !prevState);
                }}
              />
            )}
          </div>
        ) : (
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
        )}
      </>
    );
  }
);

export default Input;
