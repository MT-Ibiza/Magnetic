import React, { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', height = 'h-32', children, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`textarea textarea-bordered ${height} ${className}`}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default TextArea;
