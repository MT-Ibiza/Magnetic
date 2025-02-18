import { Item } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  item: Item;
  currentAmount: number;
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
}

function ItemHandleBookButtons(props: Props) {
  const { item, currentAmount, onClickAdd, onClickRemove } = props;

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {/* <Link to={`item/${item.id}`}>
        <Button variant="outline">View Details</Button>
      </Link> */}
      {/* <Text>{`From ${centsToEurosWithCurrency(item.priceInCents)}`}</Text> */}
      <Button
        className="w-full"
        onClick={() => {
          onClickAdd(currentAmount + 1);
        }}
      >
        Book Now
      </Button>
    </div>
  );
}

export default ItemHandleBookButtons;
