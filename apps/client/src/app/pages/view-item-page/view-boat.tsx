import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  Badge,
  BoatCharterBookingForm,
  SectionCard,
} from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { useRef, useState } from 'react';
import {
  FaUsers,
  FaUserTie,
  FaRulerCombined,
  FaShip,
  FaBed,
  FaGasPump,
} from 'react-icons/fa';
import MobileItemSticky from '../../components/mobile-footer-item';
import BoatCalendar from './boat-calendar';
import Modal from '../../components/modal';
import {
  Boat,
  FormSubmitParams,
  Item,
  SeasonPrice,
} from '@magnetic/interfaces';
import { useApp } from '../../hooks/useApp';
import moment from 'moment';
import BookBoatCard from './book-boat-card';
import { getNumberMonth } from '../../utils';
import { API_UR_BACKED } from '../../apis/api-constants';

interface Props {
  item: Item;
}

const defaultMonthNumber = getNumberMonth();

export function ViewBoat({ item }: Props) {
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get('date');
  const initialDate = selectedDate ? moment(selectedDate).toDate() : null;
  const { addBoatToCart } = useCart();
  const { addItem } = useCartStore();
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const [openFormModal, setOpenFormModal] = useState(false);
  const { setSelectedItem } = useApp();
  const { seasonPrices, priceInCents, service } = item;
  const boat = item.boatAttributes as Boat;
  const {
    port,
    secondName,
    capacity,
    crew,
    lengthInMeters,
    beamInMeters,
    cabins,
    fuelConsumption,
    latitude,
    longitude,
  } = boat;

  const seasonSelected = getSeasonPrice(seasonPrices, defaultMonthNumber);
  const displayPrice = seasonSelected?.priceInCents ?? priceInCents;
  const [boatPrice, setBoatPrice] = useState(displayPrice);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const mapUrl = `https://maps.google.com/maps?z=15&t=m&q=loc:${latitude}+${longitude}&z=16&output=embed`;

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

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
  };

  const BoatAttributes = [
    {
      name: 'Capacity',
      icon: <FaUsers className="text-lg" />,
      value: capacity || 'n/a',
    },
    {
      name: 'Crew',
      icon: <FaUserTie className="text-lg" />,
      value: crew || 'n/a',
    },
    {
      name: 'Size',
      icon: <FaRulerCombined className="text-lg" />,
      value: lengthInMeters ? lengthInMeters + ' m' : 'n/a',
    },
    {
      name: 'Beam',
      icon: <FaShip className="text-lg" />,
      value: beamInMeters ? beamInMeters + ' m' : 'n/a',
    },
    {
      name: 'Cabins',
      icon: <FaBed className="text-lg" />,
      value: cabins || 'n/a',
    },
    {
      name: 'Fuel Consumption',
      icon: <FaGasPump className="text-lg" />,
      value: fuelConsumption ? fuelConsumption + ' L/H' : 'n/a',
    },
  ];

  const handleAddBoat = (data: FormSubmitParams<any>) => {
    const { form, seasonId } = data;
    if (item) {
      addBoatToCart.mutate(
        {
          itemId: item.id,
          formData: form,
          seasonId,
        },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            setOpenFormModal(false);
            addItem({
              id: cartItem.id,
              item: item,
              quantity: 1,
              formData: form,
              priceInCents: cartItem.priceInCents,
              type: 'boat',
            });
            showAlert('Boat added to the cart', 'success');
          },
          onError: () => {
            showAlert('Failed to add Boat to the cart', 'error');
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
            <div className="flex justify-between items-center">
              <Badge name={port} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                {item.name}
              </h2>
              <p className="text-l sm:text-xl lg:text-xl font-semibold text-gray-500 mt-2">
                {secondName}
              </p>
            </div>
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
          </div>
          <SectionCard title="Included">
            <div className="text-neutral-6000 dark:text-neutral-300 editor-text">
              <div
                className="block"
                dangerouslySetInnerHTML={{
                  __html: item.description || '',
                }}
              />
            </div>
          </SectionCard>
          <div ref={calendarRef}>
            <SectionCard title="Calendar" subTitle="Select date">
              <BoatCalendar
                startDate={startDate}
                onChangeDate={(dates) => {
                  if (dates && dates[0]) {
                    const date = dates[0];
                    const monthNumber = getNumberMonth(date);
                    const season = getSeasonPrice(seasonPrices, monthNumber);
                    season && setBoatPrice(season.priceInCents);
                  }
                  onChangeDate(dates);
                }}
                boatId={boat.id}
              />
            </SectionCard>
          </div>
          {latitude && longitude && (
            <SectionCard title="Location" subTitle={port}>
              <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
                <div className="rounded-xl overflow-hidden z-0">
                  <iframe
                    title={port}
                    width="100%"
                    height="450px"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapUrl}
                  ></iframe>
                </div>
              </div>
            </SectionCard>
          )}
          {(service.instructions || service.termsAndConditions) && (
            <SectionCard title="Need to Know">
              <div>
                {service.instructions && (
                  <>
                    <h4 className="text-lg font-semibold">Before You Book</h4>
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
                      Cancellation Policy
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
        </div>
        <div className="hidden lg:block col-span-1">
          <BookBoatCard
            calendarRef={calendarRef}
            price={boatPrice}
            startDate={startDate}
            item={item}
            onClick={() => {
              setOpenFormModal(true);
              setSelectedItem(item);
            }}
          />
        </div>
        <div className="block lg:hidden">
          <MobileItemSticky
            isBoatCalendar={true}
            onClick={() => {
              setOpenFormModal(true);
              setSelectedItem(item);
            }}
            price={boatPrice}
            startDate={startDate}
            item={item}
          />
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
        <BoatCharterBookingForm
          urlApi={`${API_UR_BACKED}/boats/availability`}
          item={item}
          onSubmit={handleAddBoat}
          formData={{
            serviceId: item?.serviceId || 0,
          }}
          onCancel={() => {
            setOpenFormModal(false);
          }}
        />
      </Modal>
    </>
  );
}

function getSeasonPrice(seasonPrices: SeasonPrice[], numberMonth: number) {
  return seasonPrices.find(
    (seasonPrice) => seasonPrice.startMonth === numberMonth
  );
}
export default ViewBoat;
