import { useNavigate, useParams } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import { Button, GalleryModal, ItemsGallery } from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useState } from 'react';
import { centsToEuros, cmToMeters, eurosToCents } from '@magnetic/utils';

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
          showAlert('Product added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add product to the cart', 'error');
        },
      }
    );
  };

  return (
    <div className={`container nc-ListingCarDetailPage `}>
      <div className="flex flex-col gap-6 p-6">
        {item?.images && item.images.length > 0 && (
          <GalleryModal images={item?.images} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-base-100 p-6 rounded-lg shadow">
              <h2 className="text-2xl uppercase font-semibold">{item?.name}</h2>
              <p className="mt-[4px] text-primary-600">
                {item?.boatAttributes?.boatType}
              </p>
              <p className="mt-[10px] text-neutral-600 dark:text-neutral-300">
                {item?.description}
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow space-y-4">
              <h3 className="text-xl font-semibold">Specifications</h3>
              <ul className="list-items-props space-y-2">
                <li>
                  <strong>Capacity:</strong>{' '}
                  {item?.boatAttributes?.capacity || 'N/A'}
                </li>
                <li>
                  <strong>Crew:</strong> {item?.boatAttributes?.crew || 'N/A'}
                </li>
                <li>
                  <strong>Size:</strong>{' '}
                  {item?.boatAttributes?.sizeInMeters
                    ? `${item.boatAttributes.sizeInMeters} m`
                    : 'N/A'}
                </li>
                <li>
                  <strong>Beam:</strong>{' '}
                  {item?.boatAttributes?.beamInMeters
                    ? `${item.boatAttributes.beamInMeters} m`
                    : 'N/A'}
                </li>

                <li>
                  <strong>Cabins:</strong>{' '}
                  {item?.boatAttributes?.cabins || 'N/A'}
                </li>
                <li>
                  <strong>Fuel Consumption:</strong>{' '}
                  {`${item?.boatAttributes?.fuelConsumption} L/H` || 'N/A'}
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
                    ? `${centsToEuros(item.priceInCents)} €`
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
    </div>
  );
}

export default ViewItemPage;
