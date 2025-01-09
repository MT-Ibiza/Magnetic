import { CardWrapper } from '@magnetic/ui';
import { BookingsTable } from '../../components/bookings/bookings-table';

export function BookingsPage() {
  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Bookings</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Manage and view all bookings.
          </p>
        </div>
      </div>
      <BookingsTable />
    </CardWrapper>
  );
}

export default BookingsPage;
