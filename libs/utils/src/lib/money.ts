export function centsToEurosWithCurrency(priceInCents: number) {
  const price = priceInCents / 100;
  if (price % 1 == 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumSignificantDigits: 3,
    }).format(price);
  }
}

export function centsToEuros(priceInCents: number) {
  const euros = priceInCents / 100;
  return euros;
}

export function eurosToCents(price: number) {
  const cents = price * 100;
  return cents;
}
