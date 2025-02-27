import { useCartStore } from '../../hooks/useCartStore';
import { groupCartItemsByCategory } from '../../utils';
import CheckoutItem from './checkout-item';

interface Props {}

function ProductsSummary(props: Props) {
  const { cart } = useCartStore();
  const itemsByCategory = groupCartItemsByCategory(cart);

  return (
    <div>
      {itemsByCategory.map((category, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">{category.category}</h3>
          <div className="flex flex-col gap-3">
            {category.items.map((item: any, index: number) => (
              <CheckoutItem cartItem={item} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsSummary;
