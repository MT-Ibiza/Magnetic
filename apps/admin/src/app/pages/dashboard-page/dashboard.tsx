import BookingDashboard from '../../components/booking-dashboard';
import { ErrorText } from '../../components/error-text';
import Loading from '../../components/loading';
import { useAdminDashboard } from '../../hooks/useDashboard';

export function DashboardPage() {
  const { isLoading, isError, data, error } = useAdminDashboard();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-x-5">
        <BookingDashboard title="New Bookings" bookings={data?.new || []} />
        <BookingDashboard title="Active Bookings" bookings={data?.active || []} />
        <BookingDashboard title="Upcoming Bookings" bookings={data?.upcoming || []} />
      </div>
    </div>
  );
}

export default DashboardPage;
