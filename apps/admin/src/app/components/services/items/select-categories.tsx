import { Text } from '@magnetic/ui';
import { Category } from '@magnetic/interfaces';
import Select from 'react-select';

interface Props {
  categories: Category[];
}

function SelectCategories(props: Props) {
  const { categories } = props;
  const options = categories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  return (
    <div>
      {categories.length === 0 ? (
        <div className="border rounded-md">
          <Select options={options} />
          <Text> No categories</Text>
        </div>
      ) : (
        <>
          <select className="select select-bordered w-full ">
            {categories.map((option, index) => (
              <option value={option.id} key={index}>
                {option.name}
              </option>
            ))}
          </select>
          <Text>+ New Category</Text>
        </>
      )}
    </div>
  );
}

export default SelectCategories;
