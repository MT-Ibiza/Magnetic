import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface BeachClubBookingFormData {
  venue: string;
  date: string;
  arrivalTime: string;
  numberOfPeople: number;
  kidsAges: string;
  beachBedType: string;
  restaurantReservationTime: string;
  comments: string;
}

interface Props {
  onSubmit: (data: BeachClubBookingFormData) => void;
}

export function BeachClubBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeachClubBookingFormData>({
    defaultValues: {
      venue: '',
      date: '',
      arrivalTime: '',
      numberOfPeople: 1,
      kidsAges: '',
      beachBedType: '',
      restaurantReservationTime: '',
      comments: '',
    },
  });

  const handleFormSubmit = async (data: BeachClubBookingFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="beach-club-booking-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Beach Club Booking
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Venue</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify the beach club/venue"
              {...register('venue', { required: 'Venue is required' })}
            />
            {errors.venue && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.venue.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Date</Text>
            <Input
              type="date"
              className="w-full"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.date.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Arrival Time</Text>
            <Input
              type="time"
              className="w-full"
              {...register('arrivalTime', { required: 'Arrival time is required' })}
            />
            {errors.arrivalTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.arrivalTime.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Number of People</Text>
            <Input
              type="number"
              min="1"
              className="w-full"
              {...register('numberOfPeople', {
                required: 'Number of people is required',
                valueAsNumber: true,
              })}
            />
            {errors.numberOfPeople && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.numberOfPeople.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Kids and Ages</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="e.g., 2 kids, ages 5 and 8"
              {...register('kidsAges')}
            />
          </div>
          <div>
            <Text className="mb-2">Beach Bed Amount/Type</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify amount/type of beach beds"
              {...register('beachBedType', { required: 'Beach bed type is required' })}
            />
            {errors.beachBedType && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.beachBedType.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Restaurant Reservation Time (if applicable)</Text>
            <Input
              type="time"
              className="w-full"
              {...register('restaurantReservationTime')}
            />
          </div>
        </div>
        <div>
          <Text className="mb-2">Comments</Text>
          <TextArea
            className="w-full"
            placeholder="Add any special requests or additional comments"
            {...register('comments')}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="submit">Request Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default BeachClubBookingForm;
