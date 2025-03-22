import { Button, Checkbox, Text } from '@magnetic/ui';
import { useState } from 'react';
import Modal from './modal';
import { InlineWidget } from 'react-calendly'; // Importar Calendly

function FormCalendly(props: { onSave?: () => void; onCancel?: () => void }) {
  const { onCancel, onSave } = props;
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <h2 className="text-2xl font-semibold">Schedule a call</h2>
        <p className="text-sm text-gray-500">
          Complete the form to schedule a call with a magnetic team member.
        </p>
      </Modal.Header>
      <Modal.Body>
        <InlineWidget url="https://calendly.com/leviskp87/test" />
        <Checkbox
          name="paymentConfirmed"
          url="/privacy-policy"
          label="I have read and accept the privacy policy"
          defaultChecked={accepted}
          onChange={(checked) => setAccepted(checked)}
          className="mt-5"
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-3 w-full">
          {onCancel && (
            <Button
              radius="full"
              variant="outline"
              color="neutral"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </Modal.Footer>
    </div>
  );
}

export default FormCalendly;
