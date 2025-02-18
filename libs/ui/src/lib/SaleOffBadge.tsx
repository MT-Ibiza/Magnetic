import React, { FC } from 'react';
import { Text } from '@magnetic/ui';
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
      className={`nc-SaleOffBadge flex items-center justify-center text-sm py-1 px-4 bg-slate-600 text-red-50 rounded-full ${className}`}
    >
      <Text size="1">{price}</Text>
    </div>
  );
};

export default SaleOffBadge;
