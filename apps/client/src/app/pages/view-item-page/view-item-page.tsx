import { useNavigate, useParams } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import { Badge, GalleryModal, SectionCard } from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useEffect, useState } from 'react';
import {
  FaUsers,
  FaUserTie,
  FaRulerCombined,
  FaShip,
  FaBed,
  FaGasPump,
} from 'react-icons/fa';
import BookCard from './book-card';
import MobileItemSticky from '../../components/mobile-footer-item';
import BoatCalendar from './boat-calendar';
import Modal from '../../components/modal';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { FormSubmitParams } from '@magnetic/interfaces';
import { useApp } from '../../hooks/useApp';
import ViewItemDefault from './view-item-default';
import ViewBoat from './view-boat';

interface Props {}

export function ViewItemPage(props: Props) {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const itemId = Number(params.itemId);
  const navigate = useNavigate();
  const { addServiceToCart } = useCart();
  const { cart, addItem, removeItem } = useCartStore();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const { setSelectedItem } = useApp();

  const { isLoading, isError, item, error } = useItem(serviceId, itemId);

  useEffect(() => {
    if (item) {
      setSelectedItem(item);
    }
  }, [item]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Something went wrong'}</div>;
  }

  const handleAddItem = (item: any, quantity: number) => {
    const newVal = quantity + 1;
    addServiceToCart.mutate(
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

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // if (start && end) {
    //   onSelectRange({ start, end });
    // }
  };

  const BoatAttributes = [
    {
      name: 'Capacity',
      icon: <FaUsers className="text-lg" />,
      value: item?.boatAttributes?.capacity || 'n/a',
    },
    {
      name: 'Crew',
      icon: <FaUserTie className="text-lg" />,
      value: item?.boatAttributes?.crew || 'n/a',
    },
    {
      name: 'Size',
      icon: <FaRulerCombined className="text-lg" />,
      value: item?.boatAttributes?.lengthInMeters
        ? item?.boatAttributes?.lengthInMeters + ' m'
        : 'n/a',
    },
    {
      name: 'Beam',
      icon: <FaShip className="text-lg" />,
      value: item?.boatAttributes?.beamInMeters
        ? item?.boatAttributes?.beamInMeters + ' m'
        : 'n/a',
    },
    {
      name: 'Cabins',
      icon: <FaBed className="text-lg" />,
      value: item?.boatAttributes?.cabins || 'n/a',
    },
    {
      name: 'Fuel Consumption',
      icon: <FaGasPump className="text-lg" />,
      value: item?.boatAttributes?.fuelConsumption
        ? item?.boatAttributes?.beamInMeters + ' L/H'
        : 'n/a',
    },
  ];

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
              quantity: newVal,
              formData: form,
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
      <div className={`nc-ListingCarDetailPage `}>
        {item && (
          <div className="flex flex-col gap-6">
            {item.images && item.images.length > 0 && (
              <GalleryModal images={item?.images} />
            )}
            {item.service.serviceType === 'boat_rental' ? (
              <ViewBoat item={item} />
            ) : (
              <ViewItemDefault item={item} />
            )}
          </div>
        )}
      </div>
      <Modal open={openFormModal}>
        <RenderBookingForm
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

export default ViewItemPage;
