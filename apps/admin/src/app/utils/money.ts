export function priceCentsToDollars(priceInCents: number) {
  const price = priceInCents / 100;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  return formattedPrice;
}

export function dollarsToCents(price: number) {
  return price / 100;
}
