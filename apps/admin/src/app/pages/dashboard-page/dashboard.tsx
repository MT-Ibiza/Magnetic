import BookingDashboard from '../../components/booking-dashboard';
import BookingCard from '../../components/dashboard/booking-card';
import UpcomingBookingCard from '../../components/dashboard/upcoming-booking-card';
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
    upcomingUsers,
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
                <p className="text-sm text-gray-500">No bookings available</p>
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
                <p className="text-sm text-gray-500">No bookings available</p>
              )}
            </BookingDashboard>
            <BookingDashboard title="Upcoming Clients">
              {upcomingUsers.length > 0 ? (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                  {upcomingUsers.map((user, index) => (
                    <UpcomingBookingCard user={user} key={index} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No bookings available</p>
              )}
            </BookingDashboard>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
