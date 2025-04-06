import { Item } from '@magnetic/interfaces';
import { Button } from '@magnetic/ui';
import BookButton from '../bookings/book-button';

interface Props {
  item: Item;
  currentAmount: number;
  onClickBookNow: (amount: number) => void;
}

function ItemHandleBookButtons(props: Props) {
  const { currentAmount, onClickBookNow } = props;

  return (
    <BookButton
      onClick={() => {
        onClickBookNow(currentAmount + 1);
      }}
    />
  );
}

export default ItemHandleBookButtons;
