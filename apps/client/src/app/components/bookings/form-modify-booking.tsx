import React, { useState } from 'react';
import Modal from '../modal';
import { Button, TextArea, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { requestChangeBooking } from '../../apis/api-bookings';

interface Props {
  onCancel: () => void;
  onSave: () => void;
  bookingId: number;
}

function FormModifyBooking(props: Props) {
  const { onCancel, onSave, bookingId } = props;
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showError, setShowError] = useState(false);

  const requestChanges = useMutation({
    mutationFn: (bookingId: number) => {
      setIsSaving(true);
      return requestChangeBooking(bookingId, text);
    },
    onSuccess: () => {
      setIsSaving(false);
      toast.success(`Request Sent!`);
      onSave();
    },
    onError: () => {
      setIsSaving(false);
      toast.success(`Request couldn't be sended!`);
    },
  });

  async function handleSave() {
    if (text) {
      setShowError(false);
      await requestChanges.mutateAsync(bookingId);
    } else {
      setShowError(true);
    }
  }

  return (
    <div>
      <Modal.Header>Request a Change or Cancellation</Modal.Header>
      <Modal.Body>
        <form className="py-5 px-10">
          <Text className="mb-3">
            If you need to modify or cancel your booking, please fill out the
            form below. Our team will review your request and notify you via
            email once it has been processed.
          </Text>
          <TextArea
            className="w-full"
            required
            onChange={(e) => {
              const value = e.target.value;
              setText(value);
            }}
          />
          {showError && (
            <p className="text-xs text-red-500 mt-1">Text is required</p>
          )}
          <Text className="mt-3">
            Before submitting, please review our{' '}
            <a
              href="/terms-conditions"
              className="underline text-primary-600"
              target="_blank"
            >
              Terms and Conditions
            </a>{' '}
            for modification and cancellation policies.
          </Text>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3 justify-end w-full">
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
          <Button
            radius="full"
            loading={isSaving}
            type="submit"
            loadingText="Saving..."
            onClick={handleSave}
          >
            Send Request
          </Button>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default FormModifyBooking;
