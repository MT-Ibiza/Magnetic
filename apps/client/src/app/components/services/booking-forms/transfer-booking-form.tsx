import { Button, Checkbox, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

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
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: TransferFormData) => void;
}

export function TransferBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TransferFormData>({
    defaultValues: {
      date: '',
      time: '',
      pickUpLocation: '',
      dropOffLocation: '',
      numberOfPeople: 1,
      contactName: '',
      contactNumber: '',
      flightNumber: '',
      luggageAmount: 0,
      paymentConfirmed: false,
    },
  });

  const handleFormSubmit = async (data: TransferFormData) => {
    console.log(data);
  };

  return (
    <div className="transfer-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Transfer Booking</h2>
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
        <Checkbox
          name="paymentConfirmed"
          label="I confirm full payment for this booking."
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

export default TransferBookingForm;
