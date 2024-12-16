'use client';

// import Icon from './icon';

interface EmptyStateProps {
  className?: string;
  title?: string;
  icon?: string;
  description?: string;
  children?: React.ReactElement;
}

export function EmptyState(props: EmptyStateProps) {
  const { className, title, icon, description, children } = props;

  return (
    <div className="flex items-center mt-6 text-center border rounded-lg h-96 dark:border-gray-700">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        {icon && (
          <div className="p-3 mx-auto text-primary-500 bg-primary-100 rounded-full dark:bg-gray-800">
            {/* <Icon icon={icon} size={45} /> */}
          </div>
        )}
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">{title}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
