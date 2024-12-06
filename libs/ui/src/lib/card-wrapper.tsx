import React from 'react';

interface Props {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function CardWrapper(props: Props) {
  const { children, title, className } = props;

  return (
    <div
      className={`bg-base-100 shadow-md rounded-md p-4 lg:p-8 ${
        className || ''
      }`}
    >
      {title && <p className="mb-1 capitalize">{title}</p>}
      <div className="w-full">{children}</div>
    </div>
  );
}

export default CardWrapper;
