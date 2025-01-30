import { Button, Checkbox, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';

export interface TransferFormData {
  date: string;
  time: string;
  pickUpLocation: string;
  dropOffLocation: string;
  numberOfPeople: number;
  contactName: string;
  contactNumber: string;
  flightNumber: string;
  luggageAmount: number;
  childSeats: string;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: TransferFormData) => void;
  formData?: any;
  viewCol?: boolean;
  onCancel?: () => void;
}

export function TransferBookingForm({
  onSubmit,
  formData,
  viewCol,
  onCancel,
}: Props) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TransferFormData>({
    defaultValues: formData
      ? {
          date: formData.date,
          time: formData.time,
          pickUpLocation: formData.pickUpLocation,
          dropOffLocation: formData.dropOffLocation,
          numberOfPeople: formData.numberOfPeople,
          contactName: formData.contactName || user?.name,
          contactNumber: formData.contactNumber,
          flightNumber: formData.flightNumber,
          luggageAmount: formData.luggageAmount,
          childSeats: formData.childSeats || '',
        }
      : {
          contactName: user?.name,
        },
  });

  const handleFormSubmit = async (data: TransferFormData) => {
    onSubmit(data);
  };

  const viewClasses = viewCol
    ? 'flex flex-col gap-3'
    : 'grid grid-cols-1 md:grid-cols-2 gap-6';

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center mb-6">Transfer Booking</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className={viewClasses}>
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
            <Text className="mb-2">Pick Up Location</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="e.g., Airport, Hotel"
              {...register('pickUpLocation', {
                required: 'Pick up location is required',
              })}
            />
            {errors.pickUpLocation && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.pickUpLocation.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Drop Off Location</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="e.g., Villa, Hotel"
              {...register('dropOffLocation', {
                required: 'Drop off location is required',
              })}
            />
            {errors.dropOffLocation && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.dropOffLocation.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Number of People</Text>
            <Input
              type="number"
              min="1"
              max={20}
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
            <Text className="mb-2">Child Seats</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Enter number or type of child seats"
              {...register('childSeats')}
            />
          </div>
          <div>
            <Text className="mb-2">Contact Name</Text>
            <Input
              type="text"
              className="w-full"
              {...register('contactName', {
                required: 'Contact name is required',
              })}
            />
            {errors.contactName && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.contactName.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Contact Number</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="e.g., +1234567890"
              {...register('contactNumber', {
                required: 'Contact number is required',
              })}
            />
            {errors.contactNumber && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Flight Number</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Optional"
              {...register('flightNumber', {
                required: 'Flight Number is required',
              })}
            />
            {errors.flightNumber && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.flightNumber.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Luggage Amount</Text>
            <Input
              type="number"
              min="0"
              className="w-full"
              {...register('luggageAmount', { valueAsNumber: true })}
            />
          </div>
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

export default TransferBookingForm;
