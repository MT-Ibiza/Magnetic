import { BoatCharterFormData } from '@magnetic/interfaces';
import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: BoatCharterFormData) => void;
  formData?: any;
  onCancel?: () => void;
}

export function BoatCharterBookingForm({
  onSubmit,
  formData,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BoatCharterFormData>({
    defaultValues: formData
      ? {
          date: formData.date,
          boat: formData.boat,
          numberOfPeople: formData.numberOfPeople,
          kidsAges: formData.kidsAges,
          startTime: formData.startTime,
          lunchBooking: formData.lunchBooking || '',
          extras: formData.extras,
          comments: formData.comments || '',
        }
      : undefined,
  });

  const handleFormSubmit = async (data: BoatCharterFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="">
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
            <Input
              type="text"
              className="w-full"
              placeholder="Describe lunch preferences"
              {...register('lunchBooking')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Comments</Text>
          <TextArea
            placeholder="Add any additional comments"
            {...register('comments')}
          />
        </div>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button
              className=""
              variant="outline"
              color="neutral"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default BoatCharterBookingForm;
