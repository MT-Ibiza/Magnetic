import { CustomInput, SelectCategory } from '@magnetic/ui';
import { useState } from 'react';
import { LuWine } from 'react-icons/lu';

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

  const [searchParams, setSearchParams] = useState({
    drink: '',
    categoriesIds: undefined,
  });

  const handleSearchChange = (name: string, value: string, data?: any) => {
    const updatedFilters = { ...searchParams, [name]: value };
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
  };

  const handleCategoriesChange = (categories: CategoriesSelect[]) => {
    const ids = categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    onChangeFilters({ ...searchParams, categoriesIds: ids.join(',') });
  };

  return (
    <>
      <div className="border border-neutral-200 hidden lg:block sticky z-10 top-[80px] w-full relative mt-8 rounded-[40px] xl:rounded-[49px] shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-2 gap-x-[30px]">
          <CustomInput
            icon={<LuWine className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-400" />}
            allowTyping
            placeHolder="Search by name"
            name="drink"
            desc="Search your drinks"
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
    </>
  );
}

export default FilterDrinks;
