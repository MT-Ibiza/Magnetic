import {
  CardWrapper,
  FormJsonDetails,
  StatusBooking,
  Text,
} from '@magnetic/ui';
import { Link, useParams } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';

export function BookingPage() {
  const params = useParams();
  const bookingId = parseInt(params.id || '');

  const { isLoading, isError, data, error } = useBooking(bookingId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <CardWrapper className="p-6">
      <div className="header gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">Booking #{bookingId}</h2>
            <Text className="text-sm text-gray-500 ">
              Client: {data?.user.name}
            </Text>
            <Link to={`/orders/${data?.booking.orderId}`}>
              <Text className="text-sm text-gray-500">
                Order: #{data?.booking.orderId}
              </Text>
            </Link>
          </div>
          <div>
            <StatusBooking status={data?.booking?.status || ''} />
          </div>
        </div>
        {data && (
          <div className="">
            {data.booking.modificationRequest &&
              data.booking.status === 'modification_requested' && (
                <div className="flex justify-between items-center border p-5 rounded-md w-full mt-5">
                  <div>
                    <h1 className="font-medium text-sm mb-2">Message</h1>
                    <div className="">
                      <Text>{data.booking.modificationRequest}</Text>
                    </div>
                  </div>
                  <div>
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="border rounded-md bg-gray-100 p-2"
                      >
                        <Text size="1">Mark as</Text>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <Text size="1">✅ Approved</Text>
                        </li>
                        <li>
                          <Text size="1">❌ Canceled</Text>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            <div className="border p-5 rounded-md w-full mt-5">
              <FormJsonDetails formData={data.booking.formData} />
            </div>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export default BookingPage;
