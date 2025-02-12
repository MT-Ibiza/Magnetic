import { Button, Checkbox, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface WellnessFitnessFormData {
  service: string;
  dates: string;
  time: string;
  numberOfPeople: number;
  location: string;
  comments: string;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: WellnessFitnessFormData) => void;
}

export function WellnessFitnessBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WellnessFitnessFormData>({
    defaultValues: {
      service: '',
      dates: '',
      time: '',
      numberOfPeople: 1,
      location: '',
      comments: '',
      paymentConfirmed: false,
    },
  });

  const handleFormSubmit = async (data: WellnessFitnessFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="wellness-fitness-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Wellness & Fitness Booking (Platinum)
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Service</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify the wellness or fitness service"
              {...register('service', { required: 'Service is required' })}
            />
            {errors.service && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.service.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Date(s)</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="e.g., 2024-12-20, 2024-12-21"
              {...register('dates', { required: 'Date(s) are required' })}
            />
            {errors.dates && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.dates.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Time</Text>
            <Input
              type="time"
              className="w-full"
              {...register('time', { required: 'Time is required' })}
            />
            {errors.time && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.time.message}
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
            <Text className="mb-2">Location</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Your villa address or preferred location"
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Text className="mb-2">Comments</Text>
          <TextArea
            className="w-full"
            placeholder="Additional comments or specific requests"
            {...register('comments')}
          />
        </div>
        <Checkbox
          name="paymentConfirmed"
          label="I confirm 100% payment of the service at the time of booking."
          className="mt-4"
          defaultChecked={watch('paymentConfirmed')}
          onChange={(checked) => setValue('paymentConfirmed', checked)}
        />
        {errors.paymentConfirmed && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.paymentConfirmed.message}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default WellnessFitnessBookingForm;
