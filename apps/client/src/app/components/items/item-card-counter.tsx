import { Item } from '@magnetic/interfaces';
import { Badge, Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';

interface Props {
  item: Item;
}

function ItemCardCounter(props: Props) {
  const { item } = props;
  const { cart, addItem, removeItem } = useCartStore();
  const productCart = cart.find((itemCart) => itemCart.id === item.id);

  return (
    <div className="listingSection__wrap !space-y-4">
      <div className="flex gap-[20px]">
        <img
          className="object-cover rounded-[10px] h-[175px] w-[175px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU"
          alt={item.name}
        />
        <div>
          <div className="pb-[15px] flex items-center justify-between">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <Badge name="Category" />
          </div>
          <Text className="line-clamp-[4]">{item.description}</Text>
        </div>
      </div>
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
      <div className="flex justify-between space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-end justify-end">
          <span className="text-xl font-semibold">
            From ${centsToEurosWithCurrency(item.priceInCents)}
          </span>
        </div>
        <div className="flex items-end justify-end">
          <Button
            className="py-[10px] text-[16px] px-[40px]"
            size={1}
            onClick={() => addItem(item)}
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemCardCounter;
