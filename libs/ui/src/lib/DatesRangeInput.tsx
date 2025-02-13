import DatePicker from 'react-datepicker';
import React, { FC, useEffect, useState } from 'react';
import DatePickerCustomHeaderTwoMonth from './date-picker-custom-header';
import DatePickerCustomDay from './date-picker-day';

export interface StayDatesRangeInputProps {
  className?: string;
  onSelectRange: (range: { start: Date; end: Date }) => void;
  startDate: Date | null;
  endDate: Date | null;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = '',
  onSelectRange,
  startDate: initialStartDate,
  endDate: initialEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

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
          {`Add Date`}
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
