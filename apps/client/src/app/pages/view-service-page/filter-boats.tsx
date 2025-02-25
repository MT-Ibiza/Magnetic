import React, { useState } from 'react';
import {
  SearchBoatsMobile,
  CustomInput,
  FilterSearchMobile,
  RentalCarDatesRangeInput,
} from '@magnetic/ui';
import { BoatsSearchAttributes } from '@magnetic/interfaces';
import moment from 'moment';
import {
  budgetFilterOptions,
  capacityFilterOptions,
  sizeFilterOptions,
} from '../../constants';

interface Props {
  onChangeFilters: (filters: BoatsSearchAttributes) => void;
}

function FilterBoats(props: Props) {
  const { onChangeFilters } = props;

  const [searchParams, setSearchParams] = useState<BoatsSearchAttributes>({
    price_gt: undefined,
    price_lt: undefined,
    capacity_gt: undefined,
    capacity_lt: undefined,
    size_gt: undefined,
    size_lt: undefined,
    from: undefined,
    to: undefined,
  });

  const handleSearchChange = (name: string, value: string, data?: any) => {
    const filterName = name as 'capacity';
    const allFilters = {
      capacity: { greater: 'capacity_gt', less: 'capacity_lt' },
      size: { greater: 'size_gt', less: 'size_lt' },
      budget: { greater: 'price_gt', less: 'price_lt' },
    };

    if (data) {
      const updatedFilters = { ...searchParams, ...data };
      console.log(updatedFilters);
      setSearchParams(updatedFilters);
      onChangeFilters(updatedFilters);
    } else {
      const updatedFilters = {
        ...searchParams,
        [allFilters[filterName].greater]: '',
        [allFilters[filterName].less]: '',
      };
      setSearchParams(updatedFilters);
      onChangeFilters(updatedFilters);
    }
  };

  const handleDateChange = (date: Date) => {
    const updatedFilters = {
      ...searchParams,
      from: moment(date).format('YYYY-MM-DD'),
    };
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
  };

  return (
    <>
      <div className="nc-header-bg shadow-sm w-full sticky z-10 top-[0px] lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
        <div className="py-5 nc-header-bg flex-[3] max-w-lg !mx-auto md:px-3">
          <FilterSearchMobile>
            <SearchBoatsMobile
              capacityOptions={capacityFilterOptions}
              sizeOptions={sizeFilterOptions}
              onChangeFilters={onChangeFilters}
              searchParams={searchParams}
              budgetOptions={budgetFilterOptions}
              onClose={() => console.log('Modal closed')}
            />
          </FilterSearchMobile>
        </div>
      </div>
      <div className="hidden lg:block sticky z-10 top-[80px] w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-4 gap-x-[30px]">
          <CustomInput
            name="capacity"
            desc="capacity"
            options={capacityFilterOptions}
            value={searchParams.capacity_gt || ''}
            onChange={handleSearchChange}
          />
          <CustomInput
            name="size"
            desc="size"
            options={sizeFilterOptions}
            value={searchParams.size_gt || ''}
            onChange={handleSearchChange}
          />
          <RentalCarDatesRangeInput onSelectDate={handleDateChange} />
          <CustomInput
            name="budget"
            desc="budget"
            options={budgetFilterOptions}
            value={searchParams.price_gt || ''}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </>
  );
}

export default FilterBoats;
