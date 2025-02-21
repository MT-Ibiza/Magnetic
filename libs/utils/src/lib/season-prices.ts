import { SeasonPrice } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from './money';
import moment from 'moment';

const months = moment.months();

export const formatSeasonPrices = (seasonPrices: SeasonPrice[]) => {
  const months = moment.months();

  return seasonPrices.map((season) => {
    const { startMonth, startDay, endMonth, endDay, priceInCents, id } = season;
    const price = centsToEurosWithCurrency(priceInCents);
    const startMonthName = months[startMonth - 1];

    if (
      startMonth === endMonth &&
      startDay === 1 &&
      endDay === moment(startMonth, 'M').daysInMonth()
    ) {
      return { range: startMonthName, price, id };
    } else {
      const endMonthName = months[endMonth - 1];
      return {
        range: `${startMonthName} ${startDay} - ${endMonthName} ${endDay}`,
        price,
        id,
      };
    }
  });
};

export const formatSeasonPrice = (seasonPrices: SeasonPrice) => {
  const { startMonth, startDay, endMonth, endDay, priceInCents, id } =
    seasonPrices;
  const price = centsToEurosWithCurrency(priceInCents);
  const startMonthName = months[startMonth - 1];
  if (
    startMonth === endMonth &&
    startDay === 1 &&
    endDay === moment(startMonth, 'M').daysInMonth()
  ) {
    return { range: startMonthName, price, id };
  } else {
    const endMonthName = months[endMonth - 1];
    return {
      range: `${startMonthName} ${startDay} - ${endMonthName} ${endDay}`,
      price,
      id,
    };
  }
};
