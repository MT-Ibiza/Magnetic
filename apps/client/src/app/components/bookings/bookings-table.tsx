import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Text } from '@magnetic/ui';
import { useBookings } from '../../hooks/userBookings';
import Modal from '../modal';
import BoatBookingSummary from './summary/boat-booking-summary';
import { useEffect, useState } from 'react';
import { BookingForm } from '@magnetic/interfaces';
import { placeholderItemImage } from '../../constants';
import FormModifyBooking from './form-modify-booking';
import ViewRequest from './view-request';

interface Props {}

export function BookingsTable(props: Props) {
  const {} = props;
  const { isLoading, bookings, error, isError, refetch } = useBookings();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingForm>();
  const [openFormType, setOpenFormType] = useState<string>();

  const getStatusIndicator = (status: string) => {
    let color = 'bg-gray-400';
    if (status === 'accepted' || status === 'completed') color = 'bg-green-500';
    else if (status === 'cancelled') color = 'bg-red-500';
    else if (status === 'pending' || status === 'modification_requested')
      color = 'bg-orange-500';
    console.log(status);
    return <span className={`p-[7px] w-3 h-3 rounded-full ${color}`} />;
  };

  // const sortedBookings = [...(bookings || [])].sort((a, b) => {
  //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  // });

  function toggleOpenModal() {
    setOpenModal(!openModal);
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px]">
          <thead>
            <tr className="text-[18px] leading-[28px] text-neutral-800">
              <th>Date</th>
              <th>Service</th>
              <th>Booking</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((elm, index) => {
              const { booking, orderItem } = elm;
              return (
                <tr className="hover" key={index}>
                  <td>
                    <Text size="1" className="text-gray-500">
                      {booking.date
                        ? moment(booking.date).format('DD MMM YYYY')
                        : 'n/a'}
                    </Text>
                  </td>
                  <td>
                    <div className="flex gap-3 items-center text-neutral-6000 dark:text-neutral-300">
                      <img
                        className="w-16 h-10 object-cover rounded-md"
                        src={
                          orderItem.item.images[0]?.url || placeholderItemImage
                        }
                      />
                      <div className="flex flex-col gap-1">
                        <Text>{orderItem.item?.name}</Text>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p
                      className="hover:text-primary-500 hover:underline"
                      onClick={() => {
                        setSelectedBooking(booking);
                        toggleOpenModal();
                        setOpenFormType('view-details');
                      }}
                    >
                      {`#${booking.id}`}
                    </p>
                  </td>
                  <td className="ml-[25px] flex items-center">
                    {getStatusIndicator(booking.status)}
                  </td>
                  <td>
                    {booking.status === 'modification_requested' ? (
                      <Button
                        variant="outline"
                        radius="full"
                        onClick={() => {
                          console.log(booking);
                          setSelectedBooking(booking);
                          setOpenFormType('view-message');
                          toggleOpenModal();
                        }}
                      >
                        View Message
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        radius="full"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setOpenFormType('request-changes');
                          toggleOpenModal();
                        }}
                      >
                        Modify
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal open={openModal}>
        <>
          {openFormType === 'view-details' && selectedBooking && (
            <BoatBookingSummary
              booking={selectedBooking}
              onCancel={toggleOpenModal}
            />
          )}
          {openFormType === 'request-changes' && selectedBooking && (
            <FormModifyBooking
              bookingId={selectedBooking.id}
              onCancel={toggleOpenModal}
              onSave={toggleOpenModal}
            />
          )}
          {openFormType === 'view-message' && selectedBooking && (
            <ViewRequest
              onCancel={toggleOpenModal}
              message={selectedBooking.modificationRequest || ''}
            />
          )}
        </>
      </Modal>
    </>
  );
}

interface Form {
  id: number;
  orderId: number;
  [key: string]: any;
}

interface Item {
  id: number;
  item: {
    name: string;
    images: { url: string }[];
  };
}

interface BackendResponse {
  forms: Form[];
  items: Item[];
}

interface Booking {
  form: Form;
  item: Item['item'] | null;
}

function mapBookings(response: BackendResponse[]): Booking[] {
  if (!Array.isArray(response) || response.length === 0) return [];

  const { forms, items } = response[0];

  // Crear un mapa de items por id para acceso rápido
  const itemsMap = new Map<number, Item['item']>(
    items.map((item) => [item.id, item.item])
  );

  // Mapear los formularios con sus respectivos items
  const bookings: Booking[] = forms.map((form) => ({
    form,
    item: itemsMap.get(form.id) || null, // Si no encuentra un item, asigna null
  }));

  return bookings;
}
