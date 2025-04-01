import moment from 'moment';
import { Button, Text } from '@magnetic/ui';
import { useBookings } from '../../hooks/userBookings';
import { useState } from 'react';
import { BookingUser } from '@magnetic/interfaces';
import { placeholderItemImage } from '../../constants';
import FormModifyBooking from './form-modify-booking';
import ViewRequest from './view-request';
import Modal from '../modal';
import { sortUserBookingsByDate } from '@magnetic/utils';
import ModalBookingSummary from './modal-booking-summary';

interface Props {}

export function BookingsTable(props: Props) {
  const { isLoading, bookings, refetch } = useBookings();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingUser>();
  const [openFormType, setOpenFormType] = useState<string>();

  const sortedBookings = sortUserBookingsByDate(bookings);

  function toggleOpenModal() {
    setOpenModal(!openModal);
  }

  const getStatusIndicator = (status: string) => {
    let color = 'bg-gray-400';
    if (status === 'accepted' || status === 'completed') color = 'bg-green-500';
    else if (status === 'cancelled') color = 'bg-red-500';
    else if (status === 'pending' || status === 'modification_requested')
      color = 'bg-orange-500';
    return <span className={`p-[5px] w-2 h-2 lg:p-[7px] lg:w-3 lg:h-3 rounded-full ${color}`} />;
  };

  return (
    <>
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full min-w-[600px]">
          <thead>
            <tr className="text-[18px] leading-[28px] text-neutral-800">
              <th>Date</th>
              <th>Service</th>
              <th>Booking Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((elm, index) => {
              const { booking, orderItems } = elm;
              const orderItem = orderItems[0];
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
                          orderItem?.item?.images[0]?.url ||
                          placeholderItemImage
                        }
                      />
                      {orderItem?.item?.drinkAttributes ? (
                        <div className="flex flex-col gap-1">
                          <Text>Drinks Delivery</Text>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <Text>{orderItem?.item?.name || 'N/A'}</Text>
                          <Text size="1" className="text-gray-500">
                            {orderItem?.variant?.name}
                          </Text>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {/* <Tooltip className='w-[50px]' content={'Booking Details'}> */}
                    <p
                      className="cursor-pointer lg:pl-[55px] hover:text-primary-500 hover:underline"
                      onClick={() => {
                        setSelectedBooking(elm);
                        toggleOpenModal();
                        setOpenFormType('view-details');
                      }}
                    >
                      {`#${booking.id}`}
                    </p>
                    {/* </Tooltip> */}
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
                          setSelectedBooking(elm);
                          setOpenFormType('view-message');
                          toggleOpenModal();
                        }}
                      >
                        Requested
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        radius="full"
                        onClick={() => {
                          setSelectedBooking(elm);
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

      <div className="lg:hidden space-y-4">
        {sortedBookings.map((elm, index) => {
          const { booking, orderItems } = elm;
          const orderItem = orderItems[0];

          return (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text size="1" className="text-gray-500">
                    {booking.date
                      ? moment(booking.date).format('DD MMM YYYY')
                      : 'n/a'}
                  </Text>
                  <Text className="font-semibold">
                    {orderItem?.item?.name || 'N/A'}
                  </Text>
                  <Text size="1" className="text-gray-500">
                    {orderItem?.variant?.name}
                  </Text>
                </div>
                <img
                  className="w-16 h-10 object-cover rounded-md"
                  src={orderItem?.item?.images[0]?.url || placeholderItemImage}
                  alt="Service"
                />
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getStatusIndicator(booking.status)}
                  <p
                    className="cursor-pointer text-primary-500 hover:underline"
                    onClick={() => {
                      setSelectedBooking(elm);
                      toggleOpenModal();
                      setOpenFormType('view-details');
                    }}
                  >
                    {`#${booking.id}`}
                  </p>
                </div>
                {booking.status === 'modification_requested' ? (
                  <Button
                    variant="outline"
                    radius="full"
                    onClick={() => {
                      console.log(booking);
                      setSelectedBooking(elm);
                      setOpenFormType('view-message');
                      toggleOpenModal();
                    }}
                  >
                    Requested
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    radius="full"
                    onClick={() => {
                      setSelectedBooking(elm);
                      setOpenFormType('request-changes');
                      toggleOpenModal();
                    }}
                  >
                    Modify
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <Modal open={openModal}>
        <>
          {openFormType === 'view-details' && selectedBooking && (
            <ModalBookingSummary
              booking={selectedBooking.booking}
              items={selectedBooking.orderItems}
              onCancel={toggleOpenModal}
            />
          )}
          {openFormType === 'request-changes' && selectedBooking && (
            <FormModifyBooking
              bookingId={selectedBooking.booking.id}
              onCancel={toggleOpenModal}
              onSave={() => {
                refetch();
                toggleOpenModal();
              }}
            />
          )}
          {openFormType === 'view-message' && selectedBooking && (
            <ViewRequest
              onCancel={toggleOpenModal}
              message={selectedBooking.booking.modificationRequest || ''}
            />
          )}
        </>
      </Modal>
    </>
  );
}
