import { Button, Checkbox, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { requestACall } from '../apis/api-request-call';
import { useState } from 'react';
import Modal from './modal';
import { TODAY_DATE } from '../constants';

function FormRequestCall(props: {
  onSave?: () => void;
  onCancel?: () => void;
}) {
  const { onCancel, onSave } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      date: null,
      time: null,
      notes: '',
    },
  });

  const sendRequestCall = useMutation({
    mutationFn: (data: any) => {
      return requestACall(data);
    },
    onSuccess: () => {
      setIsSaving(false);
      onSave && onSave();
    },
    onError: () => {
      setIsSaving(false);
    },
  });

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    await sendRequestCall.mutateAsync(data);
  };

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Schedule a call</h2>
          <p className="text-sm text-gray-500">
            Complete the form to schedule a call with a magnetic team member.
          </p>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="px-10 py-5">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Fullname"
                className="input input-bordered"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <Text.TextInputError text={errors.name.message || ''} />
              )}
            </div>
            <div className="form-control">
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
            <div className="form-control">
              <label htmlFor="date" className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                id="date"
                type="date"
                min={TODAY_DATE}
                className="input input-bordered"
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && (
                <Text.TextInputError text={errors.date.message || ''} />
              )}
            </div>
            <div className="form-control">
              <label htmlFor="time" className="label">
                <span className="label-text">Time</span>
              </label>
              <input
                id="time"
                type="time"
                className="input input-bordered"
                {...register('time', { required: 'Time is required' })}
              />
              {errors.time && (
                <Text.TextInputError text={errors.time.message || ''} />
              )}
            </div>
            <div className="form-control">
              <label htmlFor="notes" className="label">
                <span className="label-text">Notes (Optional)</span>
              </label>
              <textarea
                id="notes"
                className="textarea textarea-bordered"
                {...register('notes')}
              />
            </div>
            <Checkbox
              name="paymentConfirmed"
              url="/privacy-policy"
              label="I have read and accept the privacy policy"
              defaultChecked={accepted}
              onChange={(checked) => {
                setAccepted(checked);
              }}
              className="mt-5"
            />
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
            <Button
              radius="full"
              disabled={!accepted}
              loading={isSaving}
              type="submit"
              loadingText="Scheduling..."
            >
              Schedule Call
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default FormRequestCall;
