import {
  ChildcareFormData,
  CurrentUser,
  FormSubmitParams,
  Item,
} from '@magnetic/interfaces';
import {
  Button,
  Checkbox,
  Input,
  ItemCounterButtons,
  Modal,
  Text,
  TextArea,
} from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  placeholderItemImage,
  TODAY_DATE,
} from '@magnetic/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: FormSubmitParams<ChildcareFormData>) => void;
  onCancel?: () => void;
  item?: Item;
  user?: CurrentUser;
  formData?: ChildcareFormData;
}

export function ChildcareBookingForm({
  onSubmit,
  item,
  user,
  formData,
  onCancel,
}: Props) {
  const currentSelectItem = item as Item;
  const variantOptions =
    currentSelectItem?.variants.map((variant) => {
      return {
        value: `${variant.id}`,
        text: `${currentSelectItem.name} - ${variant.hours} hours`,
      };
    }) || [];

  const allOptions = [
    {
      value: '',
      text: `${currentSelectItem.name} - ${currentSelectItem.childcareAttributes?.hours} hours`,
    },
  ].concat(variantOptions);
  const [numberOfHours, setNumberOfHours] = useState(formData?.hours || 4);
  const [accepted, setAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChildcareFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          numberOfBabysitters:
            formData.numberOfBabysitters || formData.numberOfBabysitters,
          date: formData.date,
          time: formData.time,
          childrenAges: formData.childrenAges || formData.childrenAges,
          location: formData.location || user?.accommodation,
          comments: formData.comments,
          disclaimerAccepted: formData.disclaimerAccepted,
          variantId: formData.variantId,
          hours: formData.hours || numberOfHours,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: ChildcareFormData) => {
    const formData = {
      ...data,
      numberOfBabysitters: amount,
      totalPriceInCents: total,
      hours: numberOfHours,
    };

    onSubmit({
      form: formData,
      quantity: amount,
      variantId: data.variantId,
    });
  };

  const [amount, setAmount] = useState(formData?.numberOfBabysitters || 1);

  const variantSelected = formData?.variantId
    ? currentSelectItem.variants.find((variant) => {
        return variant.id === formData?.variantId;
      })
    : undefined;
  const itemPrice = variantSelected
    ? variantSelected.priceInCents
    : currentSelectItem.priceInCents;

  const total = itemPrice * numberOfHours * amount;

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Childcare Booking</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-10 flex flex-col gap-6">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-6 md:items-end">
              <div className="col-span-1">
                <Text className="mb-2">Select Duration</Text>
                <div className="product flex justify-between items-center border border-gray-300 p-4 mb-3 rounded-md">
                  <div className="flex gap-3 items-center">
                    <Text className="text-[14px] md:text-[16px]">
                      Number of hours
                    </Text>
                  </div>
                  <div>
                    <ItemCounterButtons
                      currentAmount={numberOfHours}
                      min={4}
                      max={12}
                      onClickAdd={() => {
                        if (numberOfHours < 12) {
                          setNumberOfHours(numberOfHours + 1);
                        }
                      }}
                      onClickRemove={() => {
                        if (numberOfHours > 4) {
                          setNumberOfHours(numberOfHours - 1);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                {/* <Text className="mb-2">Number of Babysitters</Text> */}
                <div className="product flex justify-between items-center border border-gray-300 p-4 mb-3 rounded-md">
                  <div className="flex gap-3 items-center">
                    <Text className="text-[14px] md:text-[16px]">
                      Number of Babysitters
                    </Text>
                  </div>
                  <div>
                    <ItemCounterButtons
                      currentAmount={amount}
                      onClickAdd={() => {
                        const newAmount = amount + 1;
                        setAmount(newAmount);
                        setValue('numberOfBabysitters', newAmount);
                      }}
                      onClickRemove={() => {
                        if (amount > 1) {
                          const newAmount = amount - 1;
                          setAmount(newAmount);
                          setValue('numberOfBabysitters', newAmount);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <Text
                className="text-primary-600 mb-[10px] md:mb-[0px] md:mt-[-30px]"
                size="1"
              >
                Minimum service 4 hours.
              </Text>
              <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Text className="mb-2">Service</Text>
                    <Input
                      type="text"
                      className="w-full"
                      disabled
                      defaultValue={currentSelectItem?.name}
                      placeholder="Specify the service"
                      {...register('service', {
                        required: 'Service is required',
                      })}
                    />
                    {errors.service && (
                      <p className="text-[12px] text-red-500 pt-2">
                        {errors.service.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Text className="mb-2">Children & Ages</Text>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="e.g., 2 kids, ages 5 and 8"
                      {...register('childrenAges', {
                        required: 'Kids and ages are required',
                      })}
                    />
                    {errors.childrenAges && (
                      <p className="text-[12px] text-red-500 pt-2">
                        {errors.childrenAges.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="mb-2">Date</Text>
                <Input
                  type="date"
                  className="w-full"
                  min={TODAY_DATE}
                  {...register('date', { required: 'Date is required' })}
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
                  placeholder="Your villa address or preferred location"
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
            <div className="">
              <Text className="mb-2">Comments</Text>
              <TextArea
                className="w-full"
                placeholder="Additional comments or specific requests"
                {...register('comments')}
              />
            </div>
            <div>
              <Checkbox
                text="I have read and accept the"
                label="service disclaimer."
                underline={true}
                url='https://www.magnetic-travel.com/wp-content/uploads/2025/04/Consent-Disclaimer-Magnetic-Travel.pdf'
                className="mt-0"
                {...register('disclaimerAccepted', {
                  required: 'You must accept the disclaimer to continue',
                })}
                defaultChecked={watch('disclaimerAccepted')}
                onChange={(checked) => setValue('disclaimerAccepted', checked)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl">
              Total: {centsToEurosWithCurrency(total)}
            </h2>
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
                disabled={!watch('disclaimerAccepted')}
                radius="full"
                type="submit"
              >
                Book Service
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default ChildcareBookingForm;
