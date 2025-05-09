import { Button, Checkbox, Input, Modal, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { centsToEurosWithCurrency, TODAY_DATE } from '@magnetic/utils';
import {
  CurrentUser,
  DrinksDeliveryFormData,
  FormSubmitParams,
  Item,
} from '@magnetic/interfaces';
import moment from 'moment';

interface Props {
  onSubmit: (data: FormSubmitParams<DrinksDeliveryFormData>) => void;
  formData?: any;
  onCancel?: () => void;
  user?: CurrentUser;
  item?: Item;
}

export function DrinksDeliveryBookingForm(props: Props) {
  const { onSubmit, formData, onCancel, item, user } = props;
  const currentSelectItem = item;
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
            <Text className="mt-2 lg:mt-0 text-gray-500">
              Please confirm the following details before you continue.
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
          <div className="flex flex-col gap-6 p-6 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  radius="full"
                  className=""
                  variant="outline"
                  color="neutral"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button
                radius="full"
                type="submit"
                // disabled={!watch('acceptSubstitutes')}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default DrinksDeliveryBookingForm;
