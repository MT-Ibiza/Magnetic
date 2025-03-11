import React, { useState } from 'react';
import Modal from '../modal';
import { Button, TextArea, Text } from '@magnetic/ui';

interface Props {
  onCancel: () => void;
  onSave: () => void;
}

function FormModifyBooking(props: Props) {
  const { onCancel, onSave } = props;
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div>
      <Modal.Header>Request a Change or Cancellation</Modal.Header>
      <Modal.Body>
        <div className="py-5 px-10">
          <Text className="mb-3">
            If you need to modify or cancel your booking, please fill out the
            form below. Our team will review your request and notify you via
            email once it has been processed.
          </Text>
          <TextArea
            className="w-full"
            onChange={(e) => {
              const value = e.target.value;
              setText(value);
            }}
          />
          <Text className="mt-3">
            Before proceeding, please review our{' '}
            <a
              href="/terms-conditions"
              className="underline text-primary-600"
              target="_blank"
            >
              Terms and Conditions
            </a>{' '}
            regarding modifications and cancellations.
          </Text>
        </div>
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
          >
            Send Request
          </Button>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default FormModifyBooking;
