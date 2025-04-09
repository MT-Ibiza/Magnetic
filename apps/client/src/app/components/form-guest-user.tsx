import { Button, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import Modal from './modal';
import { GuestUser } from '@magnetic/interfaces';

function FormGuestUser(props: {
  onSave: (user: GuestUser) => void;
  onCancel: () => void;
}) {
  const { onCancel, onSave } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      passportNumber: '',
      billingAddress: '',
      phone: '',
      companyName: '',
    },
  });

  const onSubmit = async (data: GuestUser) => {
    onSave(data);
  };

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Complete Information</h2>
          <p className="text-sm text-gray-500">
            We will contact your email address.
          </p>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="px-10 py-5 flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="form-control w-full">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered"
                  {...register('name', {
                    required: 'Name is required',
                  })}
                />
                {errors.name && (
                  <Text.TextInputError text={errors.name.message || ''} />
                )}
              </div>
              <div className="form-control w-full">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@mail.com"
                  className="input input-bordered"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
                {errors.email && (
                  <Text.TextInputError text={errors.email.message || ''} />
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="form-control w-full">
                <label htmlFor="passportNumber" className="label">
                  <span className="label-text">Passport Number</span>
                </label>
                <input
                  id="passportNumber"
                  type="text"
                  placeholder="Passport number"
                  className="input input-bordered"
                  {...register('passportNumber')}
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="phone" className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="input input-bordered"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="billingAddress" className="label">
                <span className="label-text">Billing Address</span>
              </label>
              <input
                id="billingAddress"
                type="text"
                placeholder="Billing address"
                className="input input-bordered"
                {...register('billingAddress')}
              />
            </div>

            <div className="form-control">
              <label htmlFor="companyName" className="label">
                <span className="label-text">
                  Company Name/Number (Optional)
                </span>
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="Company name"
                className="input input-bordered"
                {...register('companyName')}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-3 w-full">
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
            <Button radius="full" type="submit" loadingText="Scheduling...">
              Pay Now
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default FormGuestUser;
