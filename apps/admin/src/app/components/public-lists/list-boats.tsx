import { Item } from '@magnetic/interfaces';
import { placeholderItemImage } from '@magnetic/utils';
import { Button, Text } from '@magnetic/ui';

interface Props {
  items: Item[];
  onClick: (item: Item) => void;
  searchTerm: string;
  selectedItems: Item[];
}

function ListBoats(props: Props) {
  const { items, onClick, searchTerm, selectedItems } = props;

  return (
    <div className="flex flex-col gap-3 w-full">
      {items
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((item) => (
          <div
            key={item.id}
            className="flex gap-5 justify-between items-center p-2 border rounded-md"
          >
            <div className="flex gap-3">
              <img
                src={
                  item.images.length > 0
                    ? item.images[0].url
                    : placeholderItemImage
                }
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="mt-2">
                <Text size="1">{item.name}</Text>
                <Text size="1" className="text-gray-500">
                  {item.boatAttributes?.secondName}
                </Text>
              </div>
            </div>
            <Button
              onClick={() => onClick(item)}
              disabled={selectedItems.some((i) => i.id === item.id)}
            >
              + Add
            </Button>
          </div>
        ))}
    </div>
  );
}

export default ListBoats;
