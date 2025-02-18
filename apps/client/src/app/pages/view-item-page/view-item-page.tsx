import { useNavigate, useParams } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import {
  Badge,
  Button,
  DatePickerCustomDay,
  DatePickerCustomHeaderTwoMonth,
  GalleryModal,
} from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useState } from 'react';
import { centsToEuros, cmToMeters, eurosToCents } from '@magnetic/utils';
import {
  FaUsers,
  FaUserTie,
  FaRulerCombined,
  FaShip,
  FaBed,
  FaGasPump,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';

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
      value: item?.boatAttributes?.sizeInMeters
        ? item?.boatAttributes?.sizeInMeters + ' m'
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

  return (
    <div className={`container nc-ListingCarDetailPage `}>
      <div className="flex flex-col gap-6 p-6">
        {item?.images && item.images.length > 0 && (
          <GalleryModal images={item?.images} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="listingSection__wrap bg-base-100 !space-y-6">
              {item?.boatAttributes?.boatType && (
                <div className="flex justify-between items-center">
                  <Badge name={item?.boatAttributes?.boatType} />
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                {item?.name}
              </h2>
              {item?.boatAttributes && (
                <>
                  <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
                    {BoatAttributes.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {amenity.icon}
                        <span>
                          {amenity.name}: {amenity.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="bg-base-100 listingSection__wrap">
              <h2 className="text-2xl font-semibold">Description</h2>
              <div className="text-neutral-6000 dark:text-neutral-300 editor-text">
                <div
                  className="block"
                  dangerouslySetInnerHTML={{ __html: item?.description || '' }}
                />
              </div>
            </div>
            {item?.boatAttributes && (
              <div className="bg-base-100 listingSection__wrap overflow-hidden">
                <div>
                  <h2 className="text-2xl font-semibold">Availability</h2>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    Prices may increase on weekends or holidays
                  </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="">
                  <DatePicker
                    selected={startDate}
                    onChange={onChangeDate}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-span-1">
            <div className="sticky bg-base-100 top-[60px] listingSectionSidebar__wrap shadow-xl">
              <div className="flex justify-between">
                <span className="text-3xl font-semibold">
                  {item?.priceInCents
                    ? `€ ${centsToEuros(item.priceInCents)}`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {' '}
                    {item?.priceInCents
                      ? `€ ${centsToEuros(item.priceInCents)}`
                      : 'N/A'}
                  </span>
                </div>
              </div>
              <Button size={2} radius="full" href={'/checkout'}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItemPage;
