'use client';

import React, { Fragment, useState } from 'react';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { BsCalendar } from 'react-icons/bs';
import DatePickerCustomHeaderTwoMonth from './date-picker-custom-header';
import DatePickerCustomDay from './date-picker-day';

interface RentalCarDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
  hasButtonSubmit?: boolean;
  onSelectDate: (date: Date) => void;
}

export const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
  className = '',
  fieldClassName = '[ nc-hero-field-padding ]',
  hasButtonSubmit = false,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onChangeDate = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      onSelectDate(date);
    }
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <BsCalendar className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })
              : 'Date'}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {'Select date'}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <Popover
        className={`RentalCarDatesRangeInput relative flex ${className}`}
      >
        {({ open }) => (
          <>
            <div
              className={`flex-1 z-10 flex items-center focus:outline-none ${
                open ? 'nc-hero-field-focused' : ''
              }`}
            >
              <PopoverButton
                className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none `}
                onClickCapture={() => document.querySelector('html')?.click()}
              >
                {renderInput()}
              </PopoverButton>
              {hasButtonSubmit && (
                <div className="pr-2 xl:pr-4">
                  {/* <ButtonSubmit href="/listing-car-detail" /> */}
                </div>
              )}
            </div>
            {open && (
              <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-1 bg-white dark:bg-neutral-800"></div>
            )}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-[26rem]">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                  <DatePicker
                    selected={selectedDate}
                    onChange={onChangeDate}
                    monthsShown={1}
                    minDate={new Date()}
                    showPopperArrow={true}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default RentalCarDatesRangeInput;
