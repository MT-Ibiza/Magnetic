import React, { FC } from 'react';
import { Text } from '@magnetic/ui';
import { Item, ItemVariant } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
export interface SaleOffBadgeProps {
  className?: string;
  item: Item;
}

export const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className = '',
  item,
}) => {
  const { variants, priceInCents } = item;
  const hightPrice = variants.length ? getHighestPrice(variants) : 0;

  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center text-sm py-1 px-4 bg-slate-600 text-red-50 rounded-full ${className}`}
    >
      {variants.length > 0 ? (
        <Text size="1">{`From ${centsToEurosWithCurrency(
          priceInCents
        )} - ${centsToEurosWithCurrency(hightPrice)}`}</Text>
      ) : (
        <Text size="1">{`${centsToEurosWithCurrency(priceInCents)}`}</Text>
      )}
    </div>
  );
};

export default SaleOffBadge;

export function getHighestPrice(variants: ItemVariant[]): number {
  return Math.max(...variants.map((variant) => variant.priceInCents));
}
