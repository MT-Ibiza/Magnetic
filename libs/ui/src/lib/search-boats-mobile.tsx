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
  const [capacityGt, setCapacityGt] = useState(searchParams.capacity_gt || '');
  const [capacityLt, setCapacityLt] = useState(searchParams.capacity_lt || '');
  const [sizeGt, setSizeGt] = useState(searchParams.size_gt || '');
  const [sizeLt, setSizeLt] = useState(searchParams.size_lt || '');
  const [budgetGt, setBudgetGt] = useState(searchParams.price_gt || '');
  const [budgetLt, setBudgetLt] = useState(searchParams.price_lt || '');

  const handleCapacityChange = (
    name: string,
    value: string,
    data: { capacity_gt: string; capacity_lt: string }
  ) => {
    setCapacityGt(data.capacity_gt);
    setCapacityLt(data.capacity_lt);
  };

  const handleSizeChange = (
    name: string,
    value: string,
    data: { size_gt: string; size_lt: string }
  ) => {
    setSizeGt(data.size_gt);
    setSizeLt(data.size_lt);
  };

  const handleBudgetChange = (
    name: string,
    value: string,
    data: { size_gt: string; size_lt: string }
  ) => {
    setBudgetGt(data.size_gt);
    setBudgetLt(data.size_lt);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    searchParams.from ? new Date(searchParams.from) : null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    const updatedFilters = {
      ...searchParams,
      capacity_gt: capacityGt || undefined,
      capacity_lt: capacityLt || undefined,
      size_gt: sizeGt || undefined,
      size_lt: sizeLt || undefined,
      price_gt: budgetGt || undefined,
      price_lt: budgetLt || undefined,
      from: selectedDate
        ? moment(selectedDate).format('YYYY-MM-DD')
        : undefined,
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
            <span>
              {capacityGt && capacityLt
                ? `${capacityGt} - ${capacityLt}`
                : 'Select Capacity'}
            </span>
          </button>
        ) : (
          <SearchBoatInput
            name={fieldNameShow}
            options={capacityOptions}
            defaultValue={capacityGt}
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
            <span>
              {sizeGt && sizeLt ? `${sizeGt} - ${sizeLt}` : 'Select Capacity'}
            </span>
          </button>
        ) : (
          <SearchBoatInput
            name={fieldNameShow}
            options={sizeOptions}
            defaultValue={sizeGt}
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
            {/* <span>{budget || 'Select Budget'}</span> */}
          </button>
        ) : (
          <SearchBoatInput
            name={fieldNameShow}
            options={budgetOptions}
            defaultValue={budgetGt}
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
              {selectedDate
                ? convertSelectedDateToString(selectedDate)
                : 'Add date'}
            </span>
          </button>
        ) : (
          <DatesRangeInput
            onSelectDate={handleDateChange}
            selectedDate={selectedDate}
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

const convertSelectedDateToString = (selectedDate: Date | null) => {
  return selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      })
    : 'Add date';
};
