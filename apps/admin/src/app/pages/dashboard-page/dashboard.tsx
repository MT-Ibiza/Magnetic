import BookingDashboard from '../../components/booking-dashboard';
import BookingCard from '../../components/dashboard/booking-card';
import { ErrorText } from '../../components/error-text';
import { useAdminDashboard } from '../../hooks/useDashboard';
import Loading from '../../components/loading';

export function DashboardPage() {
  const {
    isLoading,
    isError,
    data,
    error,
    newBookings,
    activeBookings,
    pendingBookings,
  } = useAdminDashboard();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-x-5">
        {data && (
          <>
            <BookingDashboard title="New Bookings">
              {newBookings.length > 0 ? (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                  {newBookings.map((booking, index) => (
                    <BookingCard booking={booking} key={index} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No new bookings</p>
              )}
            </BookingDashboard>
            <BookingDashboard title="Active Bookings">
              {activeBookings.length > 0 ? (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                  {activeBookings.map((booking, index) => (
                    <BookingCard booking={booking} key={index} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No active bookings</p>
              )}
            </BookingDashboard>
            <BookingDashboard title="Pending Bookings">
              {pendingBookings.length > 0 ? (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                  {pendingBookings.map((booking, index) => (
                    <BookingCard booking={booking} key={index} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No pending bookings</p>
              )}
            </BookingDashboard>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
