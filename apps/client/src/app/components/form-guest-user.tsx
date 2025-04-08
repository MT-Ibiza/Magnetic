import { Button, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import Modal from './modal';

function FormGuestUser(props: {
  onSave: (params: { guestEmail: string; guestName?: string }) => void;
  onCancel: () => void;
}) {
  const { onCancel, onSave } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guestName: '',
      guestEmail: '',
    },
  });

  const onSubmit = async (data: any) => {
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
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Fullname"
                className="input input-bordered"
                {...register('guestName')}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email *</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="youremail@mail.com"
                className="input input-bordered"
                {...register('guestEmail', {
                  required: 'Email is required',
                })}
              />
              {errors.guestEmail && (
                <Text.TextInputError text={errors.guestEmail.message || ''} />
              )}
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
