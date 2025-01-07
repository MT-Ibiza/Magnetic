import { Button, Checkbox, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface BoatCharterFormData {
  date: string;
  boat: string;
  numberOfPeople: number;
  kidsAges: string;
  startTime: string;
  lunchBooking: boolean;
  extras: string;
  depositPaid: boolean;
}

interface Props {
  onSubmit: (data: BoatCharterFormData) => void;
}

export function BoatCharterBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BoatCharterFormData>({
    defaultValues: {
      date: '',
      boat: '',
      numberOfPeople: 1,
      kidsAges: '',
      startTime: '',
      lunchBooking: false,
      extras: '',
      depositPaid: false,
    },
  });

  const handleFormSubmit = async (data: BoatCharterFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="boat-charter-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Boat Charter Booking (Gold)
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Text className="mb-2">Boat</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Select or describe the boat"
              {...register('boat', { required: 'Boat is required' })}
            />
            {errors.boat && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.boat.message}
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
              {...register('kidsAges', {
                required: 'Kids and ages are required',
              })}
            />
            {errors.kidsAges && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.kidsAges.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Start Time</Text>
            <Input
              type="time"
              className="w-full"
              {...register('startTime', { required: 'Start time is required' })}
            />
            {errors.startTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.startTime.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Extras (e.g., Seabob)</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Add any extras like Seabob"
              {...register('extras')}
            />
          </div>
          <div>
            <Text className="mb-2">Lunch Booking</Text>
            <Checkbox
              name="lunchBooking"
              label="I would like to book lunch"
              className="mt-2"
              defaultChecked={watch('lunchBooking')}
              onChange={(checked) => setValue('lunchBooking', checked)}
            />
          </div>
        </div>
        <Checkbox
          name="depositPaid"
          label="I confirm 50% deposit payment at the time of booking."
          className="mt-4"
          defaultChecked={watch('depositPaid')}
          onChange={(checked) => setValue('depositPaid', checked)}
        />
        {errors.depositPaid && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.depositPaid.message}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default BoatCharterBookingForm;
