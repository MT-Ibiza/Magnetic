import { BookingsTable } from '../../components/bookings/bookings-table';

interface Props {}

function BookingsPage(props: Props) {
  return (
    <div className="bg-base-100 listingSection__wrap">
      <div className="text-center mb-5 lg:mb-10">
        <h1 className="text-2xl lg:text-3xl font-semibold">Your Bookings</h1>
      </div>
      <BookingsTable />
    </div>
  );
}

export default BookingsPage;
