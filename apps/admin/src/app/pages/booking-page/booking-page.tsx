import { CardWrapper } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { formatDate } from '../../utils';

export function BookingPage() {
  const params = useParams();
  const bookingId = parseInt(params.id || '');

  const { isLoading, isError, booking, error } = useBooking(bookingId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Booking #{bookingId}</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Date: {booking?.date ? formatDate(booking?.date) : 'n/a'}
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}

export default BookingPage;
