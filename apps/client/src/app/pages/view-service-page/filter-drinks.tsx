import {
  CustomInput,
  FilterSearchMobile,
  SearchDrinksMobile,
  SelectCategory,
} from '@magnetic/ui';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';

interface CategoriesSelect {
  name: string;
  id: number;
  checked?: boolean;
}

interface Props {
  onChangeFilters: (filters: {
    drink?: string;
    categoriesIds?: string;
  }) => void;
  categories: CategoriesSelect[];
}

function FilterDrinks(props: Props) {
  const { onChangeFilters, categories } = props;
  const [selectedCategories, setSelectedCategories] = useState<
    CategoriesSelect[]
  >([]);
  const [searchParams, setSearchParams] = useState<{
    drink: string;
    categoriesIds?: string;
  }>({
    drink: '',
  });

  const handleSearchChange = (name: string, value: string, data?: any) => {
    const updatedFilters = { ...searchParams, [name]: value };
    setSearchParams(updatedFilters);
    if (name === 'categoriesIds' && Array.isArray(data)) {
      setSelectedCategories(data);
    }
    onChangeFilters(updatedFilters);
  };

  const handleCategoriesChange = (categories: CategoriesSelect[]) => {
    const ids = categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    onChangeFilters({ ...searchParams, categoriesIds: ids.join(',') });
  };

  // const clearFilters = () => {
  //   setSearchParams({ drink: '', categoriesIds: undefined });
  //   setSelectedCategories([]);
  //   onChangeFilters({});
  // };

  const renderXClear = (onClick: () => void) => {
    return (
      <span
        className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer"
        onClick={onClick}
      >
        <IoClose className="w-3 h-3" />
      </span>
    );
  };

  const removeCategory = (idToRemove: number) => {
    const updatedCategories = selectedCategories.filter(
      (cat) => cat.id !== idToRemove
    );
    setSelectedCategories(updatedCategories);

    const newCategoryIds = updatedCategories.map((cat) => cat.id).join(',');
    const updatedParams = {
      ...searchParams,
      categoriesIds: newCategoryIds.length > 0 ? newCategoryIds : undefined,
    };
    setSearchParams(updatedParams);
    onChangeFilters(updatedParams);
  };

  return (
    <>
      <div className="w-full sticky z-10 top-[0px] md:top-[68px] lg:hidden w-full">
        <div className="w-full">
          <FilterSearchMobile title="Search Drink" options="Search • Category">
            <SearchDrinksMobile
              searchValue={searchParams.drink || 'da'}
              value={searchParams.drink}
              onChange={handleSearchChange}
              categoriesAvailable={categories}
              onClose={() => console.log('Modal closed')}
            />
          </FilterSearchMobile>
        </div>
      </div>
      <div className="border border-neutral-200 hidden lg:block sticky z-10 lg:top-[76px] xl:top-[80px] w-full relative mt-4 rounded-[45px] shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-2 gap-x-[30px]">
          <CustomInput
            icon={
              <IoSearch className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-400" />
            }
            allowTyping
            placeHolder="Search"
            name="drink"
            desc="Search by name"
            options={[]}
            value={searchParams.drink}
            onChange={handleSearchChange}
          />
          <SelectCategory
            categoriesAvailable={categories}
            onChange={handleCategoriesChange}
          />
        </form>
      </div>
      <div className="lg:hidden flex flex-wrap gap-[10px]">
        {searchParams.drink && (
          <div className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none">
            {searchParams.drink}
            {renderXClear(() => handleSearchChange('drink', ''))}
          </div>
        )}
        {selectedCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none"
          >
            {cat.name}
            {renderXClear(() => removeCategory(cat.id))}
          </div>
        ))}
      </div>
    </>
  );
}

export default FilterDrinks;
