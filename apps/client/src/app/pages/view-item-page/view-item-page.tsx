import { useNavigate, useParams } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import { Button, ItemsGallery } from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useState } from 'react';

interface Props {}

export function ViewItemPage(props: Props) {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const itemId = Number(params.itemId);
  const navigate = useNavigate();
  const { addItemToCart } = useCart();
  const { cart, addItem, removeItem } = useCartStore();
  const { isLoading, isError, item, serviceCategories, error } = useItem(
    serviceId,
    itemId
  );
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  const showAlert = (
    message: string,
    type: 'success' | 'error' | 'warning'
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.message || 'Something went wrong'}</div>;
  const handleAddItem = (item: any, quantity: number) => {
    const newVal = quantity + 1;
    addItemToCart.mutate(
      { itemId: item.id, quantity: newVal },
      {
        onSuccess: () => {
          addItem({
            id: item.id,
            item: item,
            quantity: newVal,
          });
          showAlert('Item added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add item to the cart', 'error');
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {item?.images && item.images.length > 0 && <ItemsGallery images={item?.images} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl uppercase font-semibold">{item?.name}</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-2"></div>
            <p className="text-neutral-600 dark:text-neutral-300">
              {item?.description}
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow space-y-4">
            <h3 className="text-xl font-semibold">Boat Attributes</h3>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>
                <strong>Type:</strong> {item?.boatAttributes?.boatType || 'N/A'}
              </li>
              <li>
                <strong>Berth:</strong> {item?.boatAttributes?.berth || 'N/A'}
              </li>
              <li>
                <strong>Guests:</strong> {item?.boatAttributes?.guests || 'N/A'}
              </li>
              <li>
                <strong>Crew:</strong> {item?.boatAttributes?.crew || 'N/A'}
              </li>
              <li>
                <strong>Beam (cm):</strong>{' '}
                {item?.boatAttributes?.beamInCentimeters || 'N/A'}
              </li>
              <li>
                <strong>Cabins:</strong> {item?.boatAttributes?.cabins || 'N/A'}
              </li>
              <li>
                <strong>Fuel Consumption (liters/hour):</strong>{' '}
                {item?.boatAttributes?.fuelConsumption || 'N/A'}
              </li>
              <li>
                <strong>Size (cm):</strong>{' '}
                {item?.boatAttributes?.sizeInCentimeters || 'N/A'}
              </li>
              <li>
                <strong>Location:</strong>
                {item?.boatAttributes?.latitude &&
                item?.boatAttributes?.longitude
                  ? `Lat: ${item.boatAttributes.latitude}, Lon: ${item.boatAttributes.longitude}`
                  : 'N/A'}
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-1">
          <div className="sticky bg-base-100 top-[60px] listingSectionSidebar__wrap">
            <div>
              <h3 className="text-xl font-semibold">Price</h3>
              <p className="text-2xl font-bold text-primary mt-4">
                {item?.priceInCents
                  ? `${(item.priceInCents / 100).toFixed(2)} €`
                  : 'N/A'}
              </p>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => console.log('Add to Cart')}
                className="w-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItemPage;
