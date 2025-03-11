import { BoatCharterFormData, BookingForm } from '@magnetic/interfaces';
import { Button, FormJsonDetails } from '@magnetic/ui';
import Modal from '../../modal';

interface Props {
  booking: BookingForm;
  onCancel: () => void;
}

function BoatBookingSummary(props: Props) {
  const { booking, onCancel } = props;
  const { formData } = booking;

  return (
    <div>
      <Modal.Header>Booking Details</Modal.Header>
      <Modal.Body>
        <div className="p-10">
          <FormJsonDetails formData={formData} />
        </div>
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
