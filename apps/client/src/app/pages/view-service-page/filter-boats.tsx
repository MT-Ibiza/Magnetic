import {
  SearchBoatsMobile,
  CustomInput,
  FilterSearchMobile,
  RentalCarDatesRangeInput,
} from '@magnetic/ui';
import React, { useState } from 'react';
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
    { value: '1', label: '1-7 people' },
    { value: '8', label: '8 people' },
    { value: '9', label: '9 people' },
    { value: '10', label: '10 people' },
    { value: '11', label: '11 people' },
    { value: '12', label: '12 people' },
  ];

  const sizeOptions = [
    { value: '', label: 'Select Size' },
    { value: '500', label: '20-40ft' },
    { value: '1000', label: '40-60ft' },
    { value: '1500', label: '60-80ft' },
    { value: '2000', label: '80-100ft' },
    { value: '2500', label: '100ft +' },
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget' },
    { value: '500', label: '0 - €2000' },
    { value: '1000', label: '€2000 - €4000' },
    { value: '2000', label: '€4000 - €6000' },
    { value: '5000', label: '€6000 - €8000' },
    { value: '10000', label: '€8000 - €10000' },
    { value: '10000', label: '€10000 +' },
  ];

  const handleSearchChange = (name: string, value: string) => {
    const updatedFilters = {
      ...searchParams,
      [name]: value,
    };
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
  };

  const handleDateChange = (date: Date) => {
    const updatedFilters = {
      ...searchParams,
      date: moment(date).format('YYYY-MM-DD'),
    };
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
          <RentalCarDatesRangeInput onSelectDate={handleDateChange} />
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
