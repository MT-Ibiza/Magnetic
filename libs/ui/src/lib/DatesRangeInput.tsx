import DatePicker from 'react-datepicker';
import React, { FC, useEffect, useState } from 'react';
import DatePickerCustomHeaderTwoMonth from './date-picker-custom-header';
import DatePickerCustomDay from './date-picker-day';

export interface StayDatesRangeInputProps {
  className?: string;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = '',
  onSelectDate,
  selectedDate: initialSelectedDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate
  );

  useEffect(() => {
    setSelectedDate(initialSelectedDate);
  }, [initialSelectedDate]);

  const onChangeDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {`Add Date`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={selectedDate}
          onChange={onChangeDate}
          monthsShown={1}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
