import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export const DatePickerCustomHeaderTwoMonth = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-t-lg">
      <button
        aria-label="Previous Month"
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        onClick={(e) => {
          e.preventDefault();
          decreaseMonth();
        }}
        disabled={prevMonthButtonDisabled}
        type="button"
      >
        <BsChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-lg font-semibold">
        {date.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button
        aria-label="Next Month"
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        onClick={(e) => {
          e.preventDefault();
          increaseMonth();
        }}
        disabled={nextMonthButtonDisabled}
        type="button"
      >
        <BsChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DatePickerCustomHeaderTwoMonth;
