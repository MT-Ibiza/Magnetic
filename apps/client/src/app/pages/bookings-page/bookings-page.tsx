import { BookingsTable } from '../../components/bookings/bookings-table';

interface Props {}

function BookingsPage(props: Props) {
  return (
    <div className="bg-base-100 lg:pb-32">
      <div className="lg:mt-12  text-center mb-5 lg:mb-20">
        <h1 className="text-3xl md:text-4xl font-semibold">Your Bookings</h1>
        <div className="flex justify-center gap-4 mt-2 md:mt-3">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-lg">Confirmed</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            <span className="text-lg">Pending</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-lg">Cancelled</span>
          </div>
        </div>
      </div>
      <BookingsTable />
    </div>
  );
}

export default BookingsPage;
