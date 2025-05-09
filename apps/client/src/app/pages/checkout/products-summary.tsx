import {
  calculateTotalCartItems,
  centsToEurosWithCurrency,
  findICartItemDrink,
} from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';
import { formatDate, groupCartItemsByCategory } from '../../utils';
import CheckoutItem from './checkout-item';
import { Text } from '@magnetic/ui';
import { Link, useLocation } from 'react-router-dom';
import { DRINKS_MINIMUM } from '../../constants';
import CheckoutItemEdit from './checkout-item-edit';
import { CartItem } from '@magnetic/interfaces';
import { useGuestCartStore } from '../../hooks/useGuestCartStore';

function ProductsSummary({ guestMode }: { guestMode?: boolean }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const section = pathSegments[1];

  const { cart } = guestMode ? useGuestCartStore() : useCartStore();
  const itemsByCategory = groupCartItemsByCategory(cart);
  const drinkItem = findICartItemDrink(cart);

  return (
    <div>
      {itemsByCategory.map((category) => {
        const totalCategoryItems = calculateTotalCartItems(category.items);
        const isDrinksCategory = category.type === 'drinks';
        const missingAmount = DRINKS_MINIMUM - totalCategoryItems;

        return (
          <div key={category.categoryId}>
            {isDrinksCategory && totalCategoryItems < DRINKS_MINIMUM && (
              <div className="text-blue-800 bg-blue-100 p-3 mb-3 rounded-sm">
                <div className="flex justify-between">
                  <Text size="1">
                    You're {centsToEurosWithCurrency(missingAmount)} away from
                    the €700 minimum required for drink orders.
                  </Text>
                  <Link
                    className="text-sm underline"
                    to={
                      guestMode
                        ? `/${section}`
                        : `/services/${category.categoryId}`
                    }
                  >
                    Add Drinks
                  </Link>
                </div>
              </div>
            )}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {category.category}
              </h3>
              {category.type === 'drinks' && drinkItem && (
                <DrinkInfo drinkItem={drinkItem} guestMode={guestMode} />
              )}
              <div className="flex flex-col gap-4">
                {category.items.map((item) => (
                  <CheckoutItem
                    cartItem={item}
                    key={item.id}
                    guestMode={guestMode}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const DrinkInfo = ({
  drinkItem,
  guestMode,
}: {
  drinkItem: CartItem;
  guestMode?: boolean;
}) => (
  <div className="flex justify-between w-full mb-5 flex-wrap">
    <div className="flex gap-2">
      <Text size="1">{`Location: ${drinkItem.formData.location} / ${formatDate(
        drinkItem.formData.date
      )}`}</Text>
    </div>
    <CheckoutItemEdit
      guestMode={guestMode}
      formData={drinkItem.formData}
      formType={'drinks'}
      item={drinkItem.item}
      cartItemId={drinkItem.id}
    />
  </div>
);

export default ProductsSummary;
