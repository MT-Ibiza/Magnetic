import React, { useState } from 'react';
import { BoatsSearchAttributes } from '@magnetic/interfaces';
import Button from './button';
import DatesRangeInput from './DatesRangeInput';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchBoatInput from './search-boat-input';

interface CategoriesSelect {
  name: string;
  id: number;
  checked?: boolean;
}

interface SearchDrinksMobileProps {
  onChange: (name: string, value: string, data?: any) => void;
  value: string;
  //   searchParams: BoatsSearchAttributes;
  onClose?: () => void;
  categoriesAvailable: { name: string; id: number; checked?: boolean }[];
}

type DateRage = [Date | null, Date | null];

export const SearchDrinksMobile = (props: SearchDrinksMobileProps) => {
  const {
    onChange,
    // searchParams,
    categoriesAvailable,
    onClose,
    value
  } = props;

  const [fieldNameShow, setFieldNameShow] = useState<
    'search' | 'category'
  >('category');

  //   const handleSearchChange = (
  //     name: string,
  //     value: string,
  //     data: { capacity_gt: string; capacity_lt: string }
  //   ) => {
  //     setCapacityGt(data.capacity_gt);
  //     setCapacityLt(data.capacity_lt);
  //   };

  const [searchParams, setSearchParams] = useState({
    drink: '',
    categoriesIds: undefined,
  });

  const renderSearchInput = () => {
    const isActive = fieldNameShow === 'search';
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
            onClick={() => setFieldNameShow('search')}
          >
            <span className="text-neutral-400">Capacity</span>
            <span>Search</span>
          </button>
        ) : (
          <SearchBoatInput
            headingText='Search by name'
            name={fieldNameShow}
            options={[]}
            defaultValue={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  };

  const renderCategoryInput = () => {
    const isActive = fieldNameShow === 'category';
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
            onClick={() => setFieldNameShow('search')}
          >
            <span className="text-neutral-400">Category</span>
            <span>Search</span>
          </button>
        ) : (
          <SearchBoatInput
            headingText='Search by name'
            name={fieldNameShow}
            options={[]}
            optionCategories={categoriesAvailable}
            defaultValue={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  };
  return (
    <div>
      <div className="w-full space-y-5">
        {renderSearchInput()}
        {renderCategoryInput()}
      </div>
      <div className="absolute bottom-0 z-30  w-full p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
        <Button
          radius="full"
          className="flex gap-[10px]"
          size={2}
          type="submit"
          onClick={() => console.log()}
        >
          <AiOutlineSearch className="flex-shrink-0 w-5 h-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchDrinksMobile;

