import { RestaurantBookingFormData } from '@magnetic/interfaces';
import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { TODAY_DATE } from '@magnetic/utils';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: RestaurantBookingFormData) => void;
}

export function RestaurantBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantBookingFormData>({
    defaultValues: {
      venue: '',
      date: '',
      preferredTime: '',
      numberOfPeople: 1,
      kidsAges: '',
      comments: '',
    },
  });

  const handleFormSubmit = async (data: RestaurantBookingFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="restaurant-booking-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Restaurant Booking
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Venue</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify the restaurant/venue"
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
              min={TODAY_DATE}
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
            <Text className="mb-2">Preferred Time</Text>
            <Input
              type="time"
              className="w-full"
              {...register('preferredTime', {
                required: 'Preferred time is required',
              })}
            />
            {errors.preferredTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.preferredTime.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Number of people</Text>
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

export default RestaurantBookingForm;
