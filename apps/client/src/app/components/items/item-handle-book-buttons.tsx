import { Item } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  item: Item;
  currentAmount: number;
  onClicBookNow: (amount: number) => void;
  children?: React.ReactElement;
}

function ItemHandleBookButtons(props: Props) {
  const { currentAmount, onClicBookNow, children } = props;

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col justify-end">{children}</div>
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
