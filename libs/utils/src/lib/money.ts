export function centsToEurosWithCurrency(priceInCents: number) {
  const price = priceInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function centsToEuros(priceInCents: number) {
  const euros = priceInCents / 100;
  return euros;
}

export function eurosToCents(price: number) {
  const cents = price * 100;
  return cents;
}

export function getPriceRange(prices: { priceInCents: number }[]) {
  if (!prices.length) return { low: 0, high: 0 };

  return prices.reduce(
    (acc, { priceInCents }) => ({
      low: Math.min(acc.low, priceInCents),
      high: Math.max(acc.high, priceInCents),
    }),
    { low: Infinity, high: -Infinity }
  );
}

// export function centsFixed(priceInCents: number) {
//   const price = priceInCents / 100;
//   const priceFormatted = new Intl.NumberFormat('en-US', {
//     currency: 'EUR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(price);
//   return Number(priceFormatted) * 100;
// }

export function centsFixed(priceInCents: number) {
  const price = priceInCents / 100;
  const rounded = Math.round(price * 100) / 100;
  return Math.round(rounded * 100); 
}


