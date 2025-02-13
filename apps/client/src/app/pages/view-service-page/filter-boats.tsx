import {
  SearchBoatsMobile,
  CustomInput,
  FilterSearchMobile,
  RentalCarDatesRangeInput,
} from '@magnetic/ui';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { searchBoats } from '../../apis/api-boats';
import { BoatsSearchAttributes } from '@magnetic/interfaces';
import moment from 'moment';

interface Props {
  onChangeFilters: (filters: BoatsSearchAttributes) => void;
}

function FilterBoats(props: Props) {
  const { onChangeFilters } = props;

  const [searchParams, setSearchParams] = useState<BoatsSearchAttributes>({
    boatType: undefined,
    capacity: undefined,
    size: undefined,
    crew: undefined,
    priceGreaterThan: undefined,
    priceLessThan: undefined,
  });

  const capacityOptions = [
    { value: '', label: 'Select Capacity' },
    { value: '1', label: '1 person' },
    { value: '2', label: '2 persons' },
    { value: '4', label: '3-4 persons' },
    { value: '6', label: '5-6 persons' },
    { value: '10', label: '7-10 persons' },
    { value: '15', label: '10+ persons' },
  ];

  const sizeOptions = [
    { value: '', label: 'Select Size' },
    { value: '500', label: '500 cm' },
    { value: '1000', label: '1000 cm' },
    { value: '1500', label: '1500 cm' },
    { value: '2000', label: '2000 cm' },
    { value: '2500', label: '2500+ cm' },
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget' },
    { value: '500', label: 'Up to $500' },
    { value: '1000', label: '$500 - $1,000' },
    { value: '2000', label: '$1,000 - $2,000' },
    { value: '5000', label: '$2,000 - $5,000' },
    { value: '10000', label: '$5,000+' },
  ];

  const handleSearchChange = (name: string, value: string) => {
    const updatedFilters = {
      ...searchParams,
      [name]: value,
    };
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
  };

  const handleDatesChange = (range: { start: Date; end: Date }) => {
    const updatedFilters = {
      ...searchParams,
      from: moment(range.start).format('YYYY-MM-DD'),
      to: moment(range.end).format('YYYY-MM-DD'),
    };
    console.log('updatedFilters: ', updatedFilters);
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
  };

  return (
    <>
      <div className="bg-white w-full sticky z-10 top-[63px] lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
        <div className="py-5 nc-header-bg flex-[3] max-w-lg !mx-auto md:px-3">
          <FilterSearchMobile>
            <SearchBoatsMobile
              capacityOptions={capacityOptions}
              sizeOptions={sizeOptions}
              onChangeFilters={onChangeFilters}
              searchParams={searchParams}
              budgetOptions={budgetOptions}
              onClose={() => console.log('Modal cerrado')}
            />
          </FilterSearchMobile>
        </div>
      </div>

      <div className="hidden lg:block sticky z-10 top-[48px] w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-4 gap-x-[30px]">
          <CustomInput
            name="capacity"
            desc="capacity"
            options={capacityOptions}
            value={searchParams.capacity || ''}
            onChange={handleSearchChange}
          />
          <CustomInput
            name="size"
            desc="size"
            options={sizeOptions}
            value={searchParams.size || ''}
            onChange={handleSearchChange}
          />
          <RentalCarDatesRangeInput onSelectRange={handleDatesChange} />
          <CustomInput
            name="priceGreaterThan"
            desc="budget"
            options={budgetOptions}
            value={searchParams.priceGreaterThan || ''}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </>
  );
}

export default FilterBoats;
