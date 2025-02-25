import { Button, Checkbox, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import moment from 'moment';

export interface DrinksDeliveryFormData {
  date: string;
  location: string;
  time: string;
  acceptSubstitutes: boolean;
  minimumSpend: number;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: DrinksDeliveryFormData) => void;
  formData?: any;
  onCancel?: () => void;
}

export function DrinksDeliveryBookingForm(props: Props) {
  const { onSubmit, formData, onCancel } = props;
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const arrivalDate = moment(user?.arrivalDate).format('YYYY-MM-DD');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DrinksDeliveryFormData>({
    defaultValues: formData
      ? {
          date: formData.date || arrivalDate,
          location: formData.location || user?.accommodation,
          time: formData.time,
          acceptSubstitutes: false,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: DrinksDeliveryFormData) => {
    onSubmit(data);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold ">Drinks Delivery</h2>
        <Text className="text-gray-500">
          Before you continue, where should we deliver your drinks?
        </Text>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Date</Text>
            <Input
              disabled
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
            <Text className="mb-2">Location</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Your villa address"
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>
        <Checkbox
          name="acceptSubstitutes"
          label="I accept substitutes if items are unavailable."
          className="mt-4"
          defaultChecked={watch('acceptSubstitutes')}
          onChange={(checked) => setValue('acceptSubstitutes', checked)}
        />
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
          <Button type="submit" disabled={!watch('acceptSubstitutes')}>
            Submit Booking
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DrinksDeliveryBookingForm;
