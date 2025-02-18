import { BoatCharterFormData } from '@magnetic/interfaces';
import {
  Button,
  CalendarCustomInput,
  Input,
  Text,
  TextArea,
} from '@magnetic/ui';
import { Controller, useForm } from 'react-hook-form';
import { useApp } from '../../../hooks/useApp';

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
  const { currentSelectItem } = useApp();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BoatCharterFormData>({
    defaultValues: formData
      ? {
          ...formData,
          date: formData.date ? new Date(formData.date).toISOString() : '',
        }
      : undefined,
  });

  const handleFormSubmit = async (data: BoatCharterFormData) => {
    const formattedData = {
      ...data,
      boat: currentSelectItem?.name || '',
      date: new Date(data.date).toISOString(),
    };
    onSubmit(formattedData);
  };

  return (
    <div className="">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold ">Boat Charter Booking</h2>
        <h1 className="mt-2">Boat: {currentSelectItem?.name}</h1>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Date</Text>
            <Controller
              name="date"
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <CalendarCustomInput
                  selectedDate={field.value ? new Date(field.value) : null}
                  onSelectDate={field.onChange}
                  className="w-full"
                  disabledDates={[]}
                />
              )}
            />
            {errors.date && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.date.message}
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
