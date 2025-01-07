import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface ClubBookingFormData {
  venue: string;
  date: string;
  numberOfPeople: number;
  comments: string;
}

interface Props {
  onSubmit: (data: ClubBookingFormData) => void;
}

export function ClubBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClubBookingFormData>({
    defaultValues: {
      venue: '',
      date: '',
      numberOfPeople: 1,
      comments: '',
    },
  });

  const handleFormSubmit = async (data: ClubBookingFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="club-booking-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Club Booking</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Venue</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify the club venue"
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

export default ClubBookingForm;
