import { Item } from '@magnetic/interfaces';
import { Button } from '@magnetic/ui';

interface Props {
  item: Item;
  currentAmount: number;
  onClicBookNow: (amount: number) => void;
}

function ItemHandleBookButtons(props: Props) {
  const { currentAmount, onClicBookNow } = props;

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center justify-end gap-3 w-full">
        <Button
          onClick={() => {
            onClicBookNow(currentAmount + 1);
          }}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default ItemHandleBookButtons;
