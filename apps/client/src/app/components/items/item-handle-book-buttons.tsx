import { Item } from '@magnetic/interfaces';
import { Button } from '@magnetic/ui';

interface Props {
  item: Item;
  currentAmount: number;
  onClickBookNow: (amount: number) => void;
}

function ItemHandleBookButtons(props: Props) {
  const { currentAmount, onClickBookNow } = props;

  return (
    <Button
      onClick={() => {
        onClickBookNow(currentAmount + 1);
      }}
    >
      Book Now
    </Button>
  );
}

export default ItemHandleBookButtons;
