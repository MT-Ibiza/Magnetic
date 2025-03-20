import { CustomInput, SelectCategory } from '@magnetic/ui';
import { useState } from 'react';

interface Props {
  onChangeFilters: (filters: { drink?: string; category?: string }) => void;
  categories: { name: string; id: number }[];
}

function FilterDrinks(props: Props) {
  const { onChangeFilters, categories } = props;

  const [searchParams, setSearchParams] = useState({
    drink: '',
    category: undefined,
  });

  const handleSearchChange = (name: string, value: string, data?: any) => {
    const updatedFilters = { ...searchParams, [name]: value };
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
  };

  return (
    <>
      <div className="hidden lg:block sticky z-10 top-[80px] w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-2 gap-x-[30px]">
          <CustomInput
            allowTyping
            placeHolder="Search a drink"
            name="drink"
            desc="Type a drink"
            options={[]}
            value={searchParams.drink}
            onChange={handleSearchChange}
          />
          <SelectCategory categoriesAvailable={categories} />
        </form>
      </div>
    </>
  );
}

export default FilterDrinks;
