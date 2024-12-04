import React, { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', height = 'h-32', children, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`pt-[10px] px-4 border-[1px] dark:focus:ring-primary-600 block w-full rounded-2xl border-neutral-200 bg-white text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-opacity-25 ${height} ${className}`}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default TextArea;
