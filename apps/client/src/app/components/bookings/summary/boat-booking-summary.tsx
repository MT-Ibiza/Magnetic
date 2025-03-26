import { BoatCharterFormData, BookingForm } from '@magnetic/interfaces';
import { Button, FormJsonDetails, RenderFormSummary } from '@magnetic/ui';
import Modal from '../../modal';

interface Props {
  booking: BookingForm;
  onCancel: () => void;
}

function BoatBookingSummary(props: Props) {
  const { booking, onCancel } = props;

  return (
    <div>
      <Modal.Header>Booking Details</Modal.Header>
      <Modal.Body>
        <RenderFormSummary booking={booking} />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
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
        </div>
      </Modal.Footer>
    </div>
  );
}

export default BoatBookingSummary;
