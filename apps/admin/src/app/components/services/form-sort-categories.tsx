import { FC, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { SortCategories } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { sortCategories } from '../../apis/api-categories';

interface FormSortCategoriesProps {
  serviceId: number;
  categories: { id: number; name: string; position: number }[];
  onSave: () => void;
  onCancel: () => void;
}

const FormSortCategories: FC<FormSortCategoriesProps> = ({
  serviceId,
  categories,
  onSave,
  onCancel,
}) => {
  const initialCategoriesSorted = useMemo(() => {
    return [...categories].sort((a, b) => a.position - b.position);
  }, [categories]);

  const [sortedCategories, setSortedCategories] = useState(
    initialCategoriesSorted
  );

  const sortCategoriesPosition = useMutation<any, Error, SortCategories>({
    mutationFn: (data) => {
      return sortCategories(data);
    },
    onSuccess: () => {
      onSave();
      toast.success(`Categories sorted!`);
    },
    onError: () => {
      toast.success(`Categories couldn't be sorted!`);
    },
  });

  async function handleSubmit() {
    const positions = sortedCategories.map((image, index) => ({
      categoryId: image.id,
      position: index,
    }));
    await sortCategoriesPosition.mutateAsync({
      serviceId,
      positions,
    });
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div>
      <ReactSortable
        list={sortedCategories}
        setList={(newState) => {
          setSortedCategories(newState);
        }}
        className="flex flex-col gap-3"
      >
        {sortedCategories.map((category, index) => (
          <div
            key={category.id}
            className="cursor-pointer  relative p-2 bg-gray-100 rounded-lg overflow-hidden"
          >
            <span className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </span>
            <Text>{category.name}</Text>
          </div>
        ))}
      </ReactSortable>
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>
    </div>
  );
};

export default FormSortCategories;
