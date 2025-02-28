import { useNavigate, useParams } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import {
  Badge,
  DatePickerCustomDay,
  DatePickerCustomHeaderTwoMonth,
  GalleryModal,
  SectionCard,
} from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useState } from 'react';
import {
  FaUsers,
  FaUserTie,
  FaRulerCombined,
  FaShip,
  FaBed,
  FaGasPump,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import BookCard from './book-card';
import MobileItemSticky from '../../components/mobile-footer-item';
import BoatCalendar from './boat-calendar';

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
  const { isLoading, isError, item, serviceCategories, error, service } =
    useItem(serviceId, itemId);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);
  console.log(service);
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

  return (
    <div className={`nc-ListingCarDetailPage `}>
      <div className="flex flex-col gap-6">
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
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
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
            <SectionCard title="Included">
              <div className="text-neutral-6000 dark:text-neutral-300 editor-text">
                <div
                  className="block"
                  dangerouslySetInnerHTML={{ __html: item?.description || '' }}
                />
              </div>
            </SectionCard>
            {item?.boatAttributes && (
              <>
                <SectionCard
                  title="Calendar"
                  subTitle="Prices may increase on weekends or holidays"
                >
                  <BoatCalendar
                    startDate={startDate}
                    onChangeDate={onChangeDate}
                    boatId={item.boatAttributes.id}
                  />
                </SectionCard>
                <SectionCard title="Location" subTitle="Description Location">
                  <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
                    <div className="rounded-xl overflow-hidden z-0">
                      <iframe
                        title="Mapa de la Torre Eiffel"
                        width="100%"
                        height="450px"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://maps.google.com/maps?q=48.8584,2.2945&z=14&output=embed"
                      ></iframe>
                    </div>
                  </div>
                </SectionCard>
                {(service?.instructions || service?.termsAndConditions) && (
                  <SectionCard title="Things to know">
                    <div>
                      {service.instructions && (
                        <>
                          <h4 className="text-lg font-semibold">
                            Instructions
                          </h4>
                          <div
                            className="editor-text block mt-3 leading-relaxed text-neutral-500 dark:text-neutral-400"
                            dangerouslySetInnerHTML={{
                              __html: service.instructions,
                            }}
                          />
                        </>
                      )}
                      {service.instructions && service.termsAndConditions && (
                        <div className="w-14 my-[32px] border-b border-neutral-200 dark:border-neutral-700"></div>
                      )}
                      {service.termsAndConditions && (
                        <>
                          <h4 className="text-lg font-semibold">
                            Cancellation policy
                          </h4>
                          <div
                            className="editor-text block mt-3 leading-relaxed text-neutral-500 dark:text-neutral-400"
                            dangerouslySetInnerHTML={{
                              __html: service.termsAndConditions,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </SectionCard>
                )}
              </>
            )}
          </div>
          <div className="hidden lg:block col-span-1">
            {item && (
              <BookCard startDate={startDate} endDate={endDate} item={item} />
            )}
          </div>
          <div className="block lg:hidden">
            {item && (
              <MobileItemSticky
                startDate={startDate}
                endDate={endDate}
                item={item}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItemPage;
