'use client';

import { IconType } from 'react-icons';

interface EmptyStateProps {
  className?: string;
  title?: string;
  icon?: IconType;
  description?: string;
  children?: React.ReactElement;
}

export function EmptyState(props: EmptyStateProps) {
  const { className, title, icon: Icon, description, children } = props;

  return (
    <div className="flex items-center mt-6 text-center h-96">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        {Icon && (
          <div className="p-3 mx-auto text-primary-500 bg-primary-100 rounded-full">
            <Icon size={45} className="text-gray-500" />
          </div>
        )}
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">{title}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex justify-center items-center mt-4 sm:mx-auto gap-x-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
