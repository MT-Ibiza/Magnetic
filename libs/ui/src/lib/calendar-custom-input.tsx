'use client';

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi';
import DatePickerCustomHeaderTwoMonth from './date-picker-custom-header';
import DatePickerCustomDay from './date-picker-day';
import Input from './Input';

export interface CalendarCustomInputProps {
  className?: string;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  disabledDates?: Date[];
}

export const CalendarCustomInput: React.FC<CalendarCustomInputProps> = ({
  className = '',
  onSelectDate,
  selectedDate,
  disabledDates = [],
}) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onSelectDate(date);
      setOpen(false);
    }
  };

  const togglePopover = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <div onClick={togglePopover} className="w-full">
        <Input
          type="text"
          className={`w-full cursor-pointer ${className}`}
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          placeholder="Select a date"
          readOnly
        />
        <FiCalendar className="absolute right-3 top-3 text-gray-500" />
      </div>
      {open && (
        <div
          ref={popoverRef}
          className="addListingDatePickerExclude absolute z-50 bg-white shadow-lg rounded-lg p-2 mt-2 transition-all duration-300 ease-in-out opacity-100 transform scale-100"
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
            excludeDates={disabledDates}
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day, date) => (
              <DatePickerCustomDay dayOfMonth={day} date={date} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarCustomInput;
