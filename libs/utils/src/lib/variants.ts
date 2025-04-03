import { Item, ItemVariant } from '@magnetic/interfaces';

export function getCapacityRange(capacities: { capacity: number }[]) {
  if (!capacities.length) return { low: 0, high: 0 };

  return capacities.reduce(
    (acc, { capacity }) => ({
      low: Math.min(acc.low, capacity),
      high: Math.max(acc.high, capacity),
    }),
    { low: Infinity, high: -Infinity }
  );
}

export function getRangeByField(fields: { value: number }[]) {
  if (!fields.length) return { low: 0, high: 0 };

  return fields.reduce(
    (acc, { value }) => ({
      low: Math.min(acc.low, value),
      high: Math.max(acc.high, value),
    }),
    { low: Infinity, high: -Infinity }
  );
}

export function createVariantTransferOptions(
  variants: ItemVariant[],
  item: Item
) {
  const variantOptions =
    variants.map((variant) => {
      return {
        value: `${variant.id}`,
        text: `${item.name} - ${variant.name} - ${variant.capacity} pax`,
        capacity: variant.capacity || 0,
        price: variant.priceInCents,
      };
    }) || [];

  const mainItemOption = {
    value: '',
    text: `${item.name} - ${item.transferAttributes?.capacity} pax`,
    capacity: item.transferAttributes?.capacity || 0,
    price: item.priceInCents,
  };

  const isMainOptionInVariants = !!variantOptions.find(
    (variant) => variant.price === mainItemOption.price
  );

  const options = isMainOptionInVariants
    ? variantOptions
    : variantOptions.concat(mainItemOption);

  const sortOptions = options.sort((a, b) => a.price - b.price);

  return sortOptions;
}
