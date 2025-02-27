import { Button, Checkbox, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import moment from 'moment';
import Modal from '../../modal';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useApp } from '../../../hooks/useApp';
import { FormSubmitParams } from '@magnetic/interfaces';

export interface DrinksDeliveryFormData {
  date: string;
  location: string;
  time: string;
  acceptSubstitutes: boolean;
  minimumSpend: number;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: FormSubmitParams<DrinksDeliveryFormData>) => void;
  formData?: any;
  onCancel?: () => void;
}

export function DrinksDeliveryBookingForm(props: Props) {
  const { onSubmit, formData, onCancel } = props;
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const arrivalDate = moment(user?.arrivalDate).format('YYYY-MM-DD');
  const { currentSelectItem } = useApp();
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
    onSubmit({ form: data });
  };

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Drinks Delivery</h2>
            <Text className="text-gray-500">
              Before you continue, where should we deliver your drinks?
            </Text>
          </div>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="text-blue-800 bg-blue-100 py-5 px-10">
            <Text>
              Reminder: Orders must be at least{' '}
              {centsToEurosWithCurrency(70000)} to be processed
            </Text>
          </div>
          <div className="flex flex-col gap-6 p-10">
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
                  {...register('location', {
                    required: 'Location is required',
                  })}
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-3 w-full">
            <div className="flex gap-3">
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
                Book Service
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default DrinksDeliveryBookingForm;
