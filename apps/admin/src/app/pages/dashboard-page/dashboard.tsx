import { ErrorText } from '../../components/error-text';
import Loading from '../../components/loading';
import { useAdminDashboard } from '../../hooks/useDashboard';
import { Text } from '@magnetic/ui';

export function DashboardPage() {
  const { isLoading, isError, data, error, refetch } = useAdminDashboard();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-x-[20px]">
        <div className="">
          <Text>New Bookings</Text>
        </div>
        <div className="">
          <Text>Active Bookings</Text>
        </div>
        <div className="">
          <Text>Upcoming Bookings</Text>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
