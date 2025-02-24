import { FC, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Item } from '@magnetic/interfaces';
import { Button, Drawer, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { sortImages } from '../../apis/api-images';
import { toast } from 'sonner';
import { placeholderItemImage } from '../../constants';
import { groupItemsByCategory } from '@magnetic/utils';

interface FormSortItemsProps {
  serviceId: number;
  items: Item[];
  onSave: () => void;
  onCancel: () => void;
}

const FormSortItems: FC<FormSortItemsProps> = ({
  serviceId,
  items,
  onSave,
  onCancel,
}) => {
  const itemsGroup = groupItemsByCategory(items);

  // Estado para cada categoría con sus ítems ordenados
  const [sortedItems, setSortedItems] = useState(
    itemsGroup.map((group) => ({
      category: group.category,
      items: group.items,
    }))
  );

  // const sortItemsPosition = useMutation({
  //   mutationFn: (data: { serviceId: number; positions: { itemId: number; position: number }[] }) => {
  //     return sortImages(data);
  //   },
  //   onSuccess: () => {
  //     onSave();
  //     toast.success('Items sorted!');
  //   },
  //   onError: () => {
  //     toast.error("Items couldn't be sorted!");
  //   },
  // });

  async function handleSubmit() {
    const positions = sortedItems.flatMap((group) =>
      group.items.map((item, index) => ({
        itemId: item.id,
        position: index,
      }))
    );
    console.log(positions);

    // await sortItemsPosition.mutateAsync({
    //   serviceId,
    //   positions,
    // });
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div>
      {sortedItems.map((group, index) => (
        <div key={index} className="mb-6">
          <Text className="font-semibold">{group.category}</Text>
          <ReactSortable
            list={group.items}
            setList={(newList) => {
              const updatedGroups = [...sortedItems];
              updatedGroups[index].items = newList;
              setSortedItems(updatedGroups);
            }}
            className="grid grid-cols-4 gap-3 p-2 bg-gray-50 rounded-lg"
          >
            {group.items.map((item, idx) => (
              <div
                key={item.id}
                className="cursor-grab relative p-2 bg-white rounded-lg shadow-md"
              >
                <span className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded">
                  {idx + 1}
                </span>
                <img
                  src={
                    item.images.length > 0
                      ? item.images[0].url
                      : placeholderItemImage
                  }
                  alt="item"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="mt-2 text-center">
                  <Text size="1">{item.name}</Text>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      ))}
      <Drawer.Footer>
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </Drawer.Footer>
    </div>
  );
};

export default FormSortItems;
