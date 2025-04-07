import React, { useEffect, useState } from 'react';
import Button from './button';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchBoatInput from './search-boat-input';
import SearchInputMobileDrink from './search-mobile-drinks';

interface CategoriesSelect {
  name: string;
  id: number;
  checked?: boolean;
}

interface SearchDrinksMobileProps {
  onChange: (name: string, value: string, data?: any) => void;
  value: string;
  searchValue?: string;
  onClose?: () => void;
  categoriesAvailable: { name: string; id: number; checked?: boolean }[];
}

type DateRage = [Date | null, Date | null];

export const SearchDrinksMobile = (props: SearchDrinksMobileProps) => {
  const { onChange, categoriesAvailable, onClose, value, searchValue } = props;

  const [fieldNameShow, setFieldNameShow] = useState<'search' | 'category'>(
    'search'
  );

  useEffect(() => {
    if (!searchParams.drink) {
      setSearchParams((prev) => ({
        ...prev,
        drink: value,
      }));
    }
  }, [value]);

  const [selectedCategories, setSelectedCategories] =
    useState(categoriesAvailable);
  const [searchParams, setSearchParams] = useState({
    drink: '',
    categoriesIds: undefined,
  });

  const handleCategoryChange = (updatedCategories: CategoriesSelect[]) => {
    setSelectedCategories(updatedCategories);
  };

  const handleCategoryFilter = () => {
    const selectedCategoryIds = selectedCategories
      .filter((category) => category.checked)
      .map((category) => category.id);

    if (searchParams.drink) {
      onChange('drink', searchParams.drink);
    }

    if (selectedCategoryIds.length > 0) {
      onChange(
        'categoriesIds',
        selectedCategoryIds.join(','),
        selectedCategories.filter((cat) => cat.checked)
      );
    }

    if (onClose) {
      onClose();
    }
  };

  const selectedText =
    selectedCategories.length > 0 &&
    selectedCategories.some((cat) => cat.checked)
      ? selectedCategories
          .filter((cat) => cat.checked)
          .map((cat) => cat.name)
          .join(', ')
      : '';

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
            <span className="text-neutral-400">
              Search by Name {searchValue}
            </span>
            <span>Search </span>
          </button>
        ) : (
          <SearchInputMobileDrink
            allowTyping
            placeHolder={'Search'}
            searchValue={searchValue}
            name="drink"
            desc="Search by name"
            options={[]}
            value={searchParams.drink}
            onChange={(name, value) => {
              setSearchParams((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            headingText="Search by name"
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
            className={`w-full flex gap-[5px] justify-start text-sm font-medium p-4 ${
              selectedCategories.filter((cat) => cat.checked).length === 0
                ? 'justify-between'
                : 'flex-col'
            }`}
            onClick={() => setFieldNameShow('category')}
          >
            <span className="text-neutral-400 text-start">Categories</span>
            {selectedCategories.filter((cat) => cat.checked).length === 0 ? (
              <span>Search</span>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedText.split(', ').map((category, index) => (
                  <span
                    key={index}
                    className={
                      'py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer select-none border border-neutral-300 dark:border-neutral-700'
                    }
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </button>
        ) : (
          <SearchBoatInput
            headingText="Search by type"
            name={fieldNameShow}
            options={[]}
            optionCategories={selectedCategories}
            defaultValue={value}
            onChange={(name, value, data) => {
              handleCategoryChange(data);
            }}
          />
        )}
      </div>
    );
  };
  return (
    <div>
      <div className="w-full space-y-5 pb-[100px]">
        {renderSearchInput()}
        {renderCategoryInput()}
      </div>
      <div className="absolute bottom-0 left-0 z-30  w-full p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
        <Button
          radius="full"
          className="flex gap-[10px]"
          size={2}
          type="submit"
          onClick={handleCategoryFilter}
        >
          <AiOutlineSearch className="flex-shrink-0 w-5 h-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchDrinksMobile;
