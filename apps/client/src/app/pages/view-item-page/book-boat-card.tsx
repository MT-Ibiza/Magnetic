import { Item } from '@magnetic/interfaces';
import {
  centsToEurosWithCurrency,
  formatDate,
  getPriceRange,
} from '@magnetic/utils';
import { MutableRefObject, useMemo } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import BookButton from '../../components/bookings/book-button';

interface Props {
  item: Item;
  startDate: Date | null;
  price: number;
  onClick: (date: Date | null) => void;
  calendarRef: MutableRefObject<HTMLDivElement | null>;
  disableValidation?: boolean;
  children?: React.ReactNode;
}

function BookBoatCard(props: Props) {
  const { item, startDate, onClick, price, calendarRef, children } = props;
  const { priceInCents, seasonPrices } = item;

  const priceRange = useMemo(
    () => getPriceRange([...seasonPrices, { priceInCents }]),
    [seasonPrices, priceInCents]
  );

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky bg-base-100 top-[90px] listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">
          {startDate
            ? `Price: ${centsToEurosWithCurrency(price)}`
            : `From ${centsToEurosWithCurrency(
                priceRange.low
              )} - ${centsToEurosWithCurrency(priceRange.high)}`}
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="border border-neutral-200 rounded-2xl">
          <div
            className="p-3 w-full flex-1 flex relative items-center space-x-3 focus:outline-none cursor-pointer hover:bg-gray-100"
            onClick={scrollToCalendar}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <FaCalendarAlt className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-300 dark:text-neutral-400" />
            </div>
            <div className="flex-grow text-left">
              <span className="block xl:text-lg font-semibold">
                {startDate ? formatDate(startDate) : 'Date'}
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                {'Select date'}
              </span>
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-200"></div>
      </div>
      {children ? (
        <>{children}</>
      ) : (
        <BookButton
          size={2}
          radius="full"
          onClick={() => {
            onClick(startDate);
          }}
        />
      )}
    </div>
  );
}

export default BookBoatCard;
