import moment from 'moment';
import { Button, Text, Tooltip } from '@magnetic/ui';
import { useBookings } from '../../hooks/userBookings';
import { useState } from 'react';
import { BookingForm, BookingUser } from '@magnetic/interfaces';
import { placeholderItemImage } from '../../constants';
import FormModifyBooking from './form-modify-booking';
import ViewRequest from './view-request';
import Modal from '../modal';
import { sortUserBookingsByDate } from '@magnetic/utils';
import ModalBookingSummary from './modal-booking-summary';
interface Props {}

export function BookingsTable(props: Props) {
  const {} = props;
  const { isLoading, bookings, error, isError, refetch } = useBookings();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingUser>();
  const [openFormType, setOpenFormType] = useState<string>();

  const getStatusIndicator = (status: string) => {
    let color = 'bg-gray-400';
    if (status === 'accepted' || status === 'completed') color = 'bg-green-500';
    else if (status === 'cancelled') color = 'bg-red-500';
    else if (status === 'pending' || status === 'modification_requested')
      color = 'bg-orange-500';
    return <span className={`p-[7px] w-3 h-3 rounded-full ${color}`} />;
  };

  const sortedBookings = sortUserBookingsByDate(bookings);

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
