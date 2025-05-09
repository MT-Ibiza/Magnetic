import React, { HTMLAttributes, ReactNode } from 'react';
import NextPrev from './NextPrev';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  desc,
  className = 'mb-12 lg:mb-12 text-neutral-900 dark:text-neutral-50',
  isCenter = false,
  hasNextPrev = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex items-center sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? 'text-center w-full max-w-2xl mx-auto' : 'max-w-2xl'
        }
      >
        <h1
          className={`pl-6 lg:pl-0 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-3xl dark:text-neutral-100 max-w-4xl `}
          {...args}
        >
          {children || `Section Heading`}
        </h1>
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
};

export default Heading;
