import { useCategories } from '../../../hooks/useCategories';
import Loading from '../../loading';
import { Text } from '@magnetic/ui';
import { ErrorText } from '../../error-text';

interface Props {}

function SelectCategories(props: Props) {
  const {} = props;
  const { isLoading, categories, error, isError } = useCategories();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div>
      <select className="select select-bordered w-full ">
        {categories.map((option, index) => (
          <option value={option.id} key={index}>
            {option.name}
          </option>
        ))}
      </select>
      <Text>+ New Category</Text>
    </div>
  );
}

export default SelectCategories;
