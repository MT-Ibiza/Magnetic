import DatePicker from 'react-datepicker';
import React, { FC, useState } from 'react';
import DatePickerCustomHeaderTwoMonth from './date-picker-custom-header';
import DatePickerCustomDay from './date-picker-day';

export interface StayDatesRangeInputProps {
  className?: string;
  onSelectRange: (range: { start: Date; end: Date }) => void;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = '',
  onSelectRange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onSelectRange({ start, end });
    }
  };

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
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
