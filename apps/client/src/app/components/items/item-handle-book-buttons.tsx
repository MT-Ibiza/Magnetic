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
    <Button
      onClick={() => {
        onClicBookNow(currentAmount + 1);
      }}
    >
      Book Now
    </Button>
  );
}

export default ItemHandleBookButtons;
