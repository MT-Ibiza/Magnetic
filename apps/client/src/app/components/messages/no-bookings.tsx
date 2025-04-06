import { Button, Modal, Text } from '@magnetic/ui';

interface Props {
  onClose: () => void;
}

function NoBookings(props: Props) {
  const { onClose } = props;

  return (
    <>
      <Modal.Header>
        <Text>Online bookings are not available</Text>
      </Modal.Header>
      <Modal.Body>
        <div className="p-10">
          <Text>
            Online bookings are not available within 7 days of arrival. Contact
            us for assistance or further enquiries.
          </Text>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-3 w-full">
          <Button
            radius="full"
            variant="outline"
            color="neutral"
            type="button"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
}

export default NoBookings;
