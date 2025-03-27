import { BookingForm, OrderItem } from '@magnetic/interfaces';
import { Button, Modal, RenderFormSummary } from '@magnetic/ui';

interface Props {
  booking: BookingForm;
  items: OrderItem[];
  onCancel: () => void;
}

function ModalBookingSummary(props: Props) {
  const { booking, items, onCancel } = props;

  return (
    <div>
      <Modal.Header>Booking Details</Modal.Header>
      <Modal.Body>
        <RenderFormSummary booking={booking} items={items} />
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

export default ModalBookingSummary;
