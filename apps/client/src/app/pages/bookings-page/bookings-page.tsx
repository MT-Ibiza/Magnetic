import { BookingsTable } from '../../components/bookings/bookings-table';

interface Props {}

function BookingsPage(props: Props) {
  return (
    <div className="bg-base-100 listingSection__wrap">
      <div className="text-center mb-5 lg:mb-10">
        <h1 className="text-2xl lg:text-3xl font-semibold">Your Bookings</h1>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm">Confirmed</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
            <span className="text-sm">Pending</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm">Cancelled</span>
          </div>
        </div>
      </div>
      <BookingsTable />
    </div>
  );
}

export default BookingsPage;
