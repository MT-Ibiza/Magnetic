import { CustomInput, SelectCategory } from '@magnetic/ui';
import { useState } from 'react';

interface Props {
  onChangeFilters: (filters: any) => void;
}

function FilterDrinks(props: Props) {
  const { onChangeFilters } = props;

  const [searchParams, setSearchParams] = useState({
    units: undefined,
    category: '',
  });

  const handleSearchChange = (name: string, value: string, data?: any) => {
    const updatedFilters = { ...searchParams, [name]: value };
    setSearchParams(updatedFilters);
    onChangeFilters(updatedFilters);
    console.log(searchParams)
  };

  return (
    <>
      <div className="hidden lg:block sticky z-10 top-[80px] w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <form className="lg:grid grid-cols-2 gap-x-[30px]">
          <CustomInput
            allowTyping
            placeHolder="Search drink category"
            name="category"
            desc="Select or type a drink category"
            options={[
              { value: 'cocktails', label: 'Cocktail' },
              { value: 'beer', label: 'Beer' },
              { value: 'wine', label: 'Wine' },
              { value: 'whiskey', label: 'Whiskey' },
              { value: 'non-alcoholic', label: 'Non-Alcoholic' },
            ]}
            value={searchParams.category}
            onChange={handleSearchChange}
          />
          <SelectCategory />
        </form>
      </div>
    </>
  );
}

export default FilterDrinks;
