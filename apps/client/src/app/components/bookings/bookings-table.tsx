import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Text } from '@magnetic/ui';
import { useBookings } from '../../hooks/userBookings';
import Modal from '../modal';
import BoatBookingSummary from './summary/boat-booking-summary';
import { useState } from 'react';
import { BookingForm } from '@magnetic/interfaces';
import { placeholderItemImage } from '../../constants';

interface Props {}

export function BookingsTable(props: Props) {
  const {} = props;
  const { isLoading, bookings, error, isError, refetch } = useBookings();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingForm>();

  const getStatusIndicator = (status: string) => {
    let color = 'bg-gray-400';
    if (status === 'paid' || status === 'confirmed') color = 'bg-green-500';
    else if (status === 'cancelled') color = 'bg-red-500';
    else if (status === 'pending') color = 'bg-orange-500';

    return <span className={`p-[7px] w-3 h-3 rounded-full ${color}`} />;
  };

  const sortedBookings = [...(bookings || [])].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

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
            {sortedBookings.map((booking, index) => (
              <tr className="hover" key={index}>
                <td>
                  <Text size="1" className="text-gray-500">
                    {moment(booking.createdAt).format('DD MMM YYYY')}
                  </Text>
                </td>
                <td>
                  <div className="flex gap-3 items-center text-neutral-6000 dark:text-neutral-300">
                    <img
                      className="w-16 h-10 object-cover rounded-md"
                      src={booking.service.imageUrl || placeholderItemImage}
                      alt={booking.service.name}
                    />
                    <div className="flex flex-col gap-1">
                      <Text>{booking.service.name}</Text>
                    </div>
                  </div>
                </td>
                <td>
                  <p
                    className="hover:text-primary-500 hover:underline"
                    onClick={() => {
                      setSelectedBooking(booking);
                      toggleOpenModal();
                    }}
                  >
                    {`#${booking.id}`}
                  </p>
                </td>
                <td className="ml-[25px] flex items-center">
                  {getStatusIndicator(booking.order.status)}
                </td>
                <td>
                  <Button variant="outline" radius="full">
                    Modify
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={openModal}>
        <Modal.Header>Booking Details</Modal.Header>
        <Modal.Body>
          <div className="p-10">
            {selectedBooking ? (
              <BoatBookingSummary booking={selectedBooking} />
            ) : (
              <p>No data</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <Button
              radius="full"
              className=""
              variant="outline"
              color="neutral"
              type="button"
              onClick={toggleOpenModal}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
