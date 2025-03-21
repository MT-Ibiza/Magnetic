import { Alert, RenderBookingForm, SectionCard } from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useState } from 'react';
import BookCard from './book-card';
import MobileItemSticky from '../../components/mobile-footer-item';
import Modal from '../../components/modal';
import { FormSubmitParams, Item } from '@magnetic/interfaces';
import { useApp } from '../../hooks/useApp';
import { API_URL } from '../../apis/api-constants';

interface Props {
  item: Item;
}

export function ViewItemDefault({ item }: Props) {
  const { addServiceToCart } = useCart();
  const { cart, addItem, removeItem } = useCartStore();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const { setSelectedItem } = useApp();

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

  const handleAddService = (data: FormSubmitParams<any>) => {
    const { form, quantity, variantId } = data;
    const newVal = quantity || 1;
    if (item) {
      addServiceToCart.mutate(
        {
          itemId: item.id,
          quantity: newVal,
          formData: form,
          variantId,
        },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            setOpenFormModal(false);
            addItem({
              id: cartItem.id,
              item: item,
              quantity: cartItem.quantity,
              formData: form,
              priceInCents: cartItem.priceInCents,
              type: cartItem.type,
            });
            showAlert('Product added to the cart', 'success');
          },
          onError: () => {
            showAlert('Failed to add product to the cart', 'error');
          },
        }
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="listingSection__wrap bg-base-100 !space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {item?.name}
            </h2>
          </div>
          <SectionCard title="Details">
            <div className="text-neutral-6000 dark:text-neutral-300 editor-text">
              <div
                className="block"
                dangerouslySetInnerHTML={{
                  __html: item?.description || '',
                }}
              />
            </div>
          </SectionCard>
        </div>
        <div className="hidden lg:block col-span-1">
          {item && (
            <BookCard
              item={item}
              onClick={() => {
                setOpenFormModal(true);
                setSelectedItem(item);
              }}
            />
          )}
        </div>
        <div className="block lg:hidden">
          {item && (
            <MobileItemSticky
              startDate={startDate}
              // endDate={endDate}
              item={item}
              price={0}
              onClick={() => {
                setOpenFormModal(true);
                setSelectedItem(item);
              }}
            />
          )}
        </div>
      </div>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <Modal open={openFormModal}>
        <RenderBookingForm
          apiUrl={API_URL}
          item={item}
          type={item?.category?.formType || item?.service.serviceType || ''}
          formData={{
            serviceId: item?.serviceId || 0,
          }}
          onSubmit={handleAddService}
          onClose={() => {
            setOpenFormModal(false);
          }}
        />
      </Modal>
    </>
  );
}

export default ViewItemDefault;
