import React, { useState } from 'react';
import { BoatsSearchAttributes } from '@magnetic/interfaces';
import Button from './button';
import DatesRangeInput from './DatesRangeInput';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchBoatInput from './search-boat-input';

interface SearchBoatsMobileProps {
  capacityOptions: { value: string; label: string }[];
  sizeOptions: { value: string; label: string }[];
  budgetOptions: { value: string; label: string }[];
  onChangeFilters: (filters: BoatsSearchAttributes) => void;
  searchParams: BoatsSearchAttributes;
  onClose?: () => void;
}

type DateRage = [Date | null, Date | null];

export const SearchBoatsMobile = (props: SearchBoatsMobileProps) => {
  const {
    capacityOptions,
    sizeOptions,
    onChangeFilters,
    searchParams,
    onClose,
    budgetOptions,
  } = props;

  const [fieldNameShow, setFieldNameShow] = useState<
    'capacity' | 'size' | 'budget' | 'dates'
  >('capacity');
  const [capacity, setCapacity] = useState(searchParams.capacity || '');
  const [size, setSize] = useState(searchParams.size || '');
  const [budget, setBudget] = useState(searchParams.priceGreaterThan || '');
  const [startDate, setStartDate] = useState<Date | null>(
    searchParams.from ? new Date(searchParams.from) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    searchParams.to ? new Date(searchParams.to) : null
  );

  const handleCapacityChange = (name: string, value: string) =>
    setCapacity(value);
  const handleSizeChange = (name: string, value: string) => setSize(value);
  const handleBudgetChange = (name: string, value: string) => setBudget(value);

  const handleDatesChange = (range: {
    start: Date | null;
    end: Date | null;
  }) => {
    setStartDate(range.start);
    setEndDate(range.end);
  };

  const handleSearch = () => {
    const updatedFilters = {
      ...searchParams,
      capacity,
      size,
      budget,
      from: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
      to: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
    };

    onChangeFilters(updatedFilters);

    if (onClose) {
      onClose();
    }
  };

  const renderCapacityInput = () => {
    const isActive = fieldNameShow === 'capacity';
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className="w-full flex justify-between text-sm font-medium p-4"
            onClick={() => setFieldNameShow('capacity')}
          >
            <span className="text-neutral-400">Capacity</span>
            <span>{capacity || 'Select Capacity'}</span>
          </button>
        ) : (
          <SearchBoatInput
            name={fieldNameShow}
            options={capacityOptions}
            defaultValue={capacity}
            onChange={handleCapacityChange}
          />
        )}
      </div>
    );
  };

  const renderSizeInput = () => {
    const isActive = fieldNameShow === 'size';
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className="w-full flex justify-between text-sm font-medium p-4"
            onClick={() => setFieldNameShow('size')}
          >
            <span className="text-neutral-400">Size</span>
            <span>{size || 'Select Size'}</span>
          </button>
        ) : (
          <SearchBoatInput
            name={fieldNameShow}
            options={sizeOptions}
            defaultValue={size}
            onChange={handleSizeChange}
          />
        )}
      </div>
    );
  };

  const renderBudgetInput = () => {
    const isActive = fieldNameShow === 'budget';
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className="w-full flex justify-between text-sm font-medium p-4"
            onClick={() => setFieldNameShow('budget')}
          >
            <span className="text-neutral-400">Budget</span>
            <span>{budget || 'Select Budget'}</span>
          </button>
        ) : (
          <SearchBoatInput
            name={fieldNameShow}
            options={budgetOptions}
            defaultValue={budget}
            onChange={handleBudgetChange}
          />
        )}
      </div>
    );
  };

  const renderInputDates = () => {
    const isActive = fieldNameShow === 'dates';
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className="w-full flex justify-between text-sm font-medium p-4"
            onClick={() => setFieldNameShow('dates')}
          >
            <span className="text-neutral-400">When</span>
            <span>
              {startDate
                ? convertSelectedDateToString([startDate, endDate])
                : 'Add date'}
            </span>
          </button>
        ) : (
          <DatesRangeInput
            onSelectRange={handleDatesChange}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {renderCapacityInput()}
        {renderSizeInput()}
        {renderBudgetInput()}
        {renderInputDates()}
      </div>
      <div className="absolute bottom-0 z-30  w-full p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
        <Button
          radius="full"
          className="flex gap-[10px]"
          size={2}
          type="submit"
          onClick={handleSearch}
        >
          <AiOutlineSearch className="flex-shrink-0 w-5 h-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBoatsMobile;

const convertSelectedDateToString = ([startDate, endDate]: DateRage) => {
  const dateString =
    (startDate?.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    }) || '') +
    (endDate
      ? ' - ' +
        endDate?.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        })
      : '');
  return dateString;
};
