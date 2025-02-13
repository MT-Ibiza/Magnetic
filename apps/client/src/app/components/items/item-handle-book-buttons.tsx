import { Item } from '@magnetic/interfaces';
import { Button } from '@magnetic/ui';
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
    <div className="flex items-center justify-end gap-4 ">
      <Link to={`item/${item.id}`}>
        <Button variant="outline">View Details</Button>
      </Link>
      <Button
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
