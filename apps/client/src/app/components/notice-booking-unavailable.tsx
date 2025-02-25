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
        <div className="text-[14px] leading-[18px] lg:text-[16px] lg:leading-[24px] rounded-full border border-primary-500 bg-primary-50 text-primary-700 mb-5 flex flex-col gap-3 px-10 py-4 lg:px-5 lg:py-2 bg-primary-100">
          Booking services are only available 7 days before your arrival date.
          However, feel free to contact us via WhatsApp for assistance or
          further inquiries.
        </div>
      )}
    </>
  );
}

export default NoticeBookingUnavailable;
