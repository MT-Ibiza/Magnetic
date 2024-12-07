import { Text } from '@magnetic/ui';
import { Category } from '@magnetic/interfaces';

interface Props {
  categories: Category[];
}

function SelectCategories(props: Props) {
  const { categories } = props;

  return (
    <div>
      {categories.length === 0 ? (
        <Text> No categories</Text>
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
