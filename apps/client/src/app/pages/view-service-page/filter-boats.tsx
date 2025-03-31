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
import {
  BsArrowsExpand,
  BsArrowsMove,
  BsCurrencyDollar,
  BsFillCalendarDateFill,
  BsPeople,
  BsPeopleFill,
} from 'react-icons/bs';

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

  const allFilters = {
    capacity: { greater: 'capacity_gt', less: 'capacity_lt' },
    size: { greater: 'size_gt', less: 'size_lt' },
    budget: { greater: 'price_gt', less: 'price_lt' },
  };

  const handleSearchChange = (name: string, value: string, data?: any) => {
    const filterName = name as 'capacity';
    if (data) {
      const updatedFilters = { ...searchParams, ...data };
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

  const handleDateChange = (date: Date | null) => {
    const updatedFilters = {
      ...searchParams,
      from: date ? moment(date).format('YYYY-MM-DD') : undefined,
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
      <div className="border border-neutral-200 hidden lg:block sticky z-10 top-[80px] w-full relative mt-4 rounded-[45px] shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-4 gap-x-[30px]">
          <CustomInput
            name="capacity"
            desc="Select capacity"
            options={capacityFilterOptions}
            value={searchParams.capacity_gt || ''}
            onChange={handleSearchChange}
            icon={
              <BsPeople className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-400" />
            }
          />
          <CustomInput
            name="size"
            desc="Select size"
            options={sizeFilterOptions}
            value={searchParams.size_gt || ''}
            onChange={handleSearchChange}
            icon={
              <BsArrowsExpand className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-400" />
            }
          />
          <RentalCarDatesRangeInput onSelectDate={handleDateChange} />
          <CustomInput
            name="budget"
            desc="Select budget"
            options={budgetFilterOptions}
            value={searchParams.price_gt || ''}
            onChange={handleSearchChange}
            icon={
              <BsCurrencyDollar className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-400" />
            }
          />
        </form>
      </div>
    </>
  );
}

export default FilterBoats;
