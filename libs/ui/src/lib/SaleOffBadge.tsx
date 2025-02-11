import React, { FC } from 'react';

export interface SaleOffBadgeProps {
  className?: string;
  price?: string;
}

export const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className = '',
  price = '-10% today',
}) => {
  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center text-sm py-0.5 px-3 bg-red-700 text-red-50 rounded-full ${className}`}
    >
      {price}
    </div>
  );
};

export default SaleOffBadge;
