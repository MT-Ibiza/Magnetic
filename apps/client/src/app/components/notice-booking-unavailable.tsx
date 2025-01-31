import { userCanMakeBookings } from '../utils';

interface Props {
  arrivalDate?: string;
}

function NoticeBookingUnavailable(props: Props) {
  const { arrivalDate } = props;
  const unAvailableBooking = arrivalDate
    ? !userCanMakeBookings(arrivalDate)
    : false;

  return (
    <>
      {unAvailableBooking && (
        <div className="mb-5 flex flex-col gap-3 p-5 border-md bg-red-100">
          Booking services are only available 7 days before your arrival date.
          However, feel free to contact us via WhatsApp for assistance or
          further inquiries.
        </div>
      )}
    </>
  );
}

export default NoticeBookingUnavailable;
