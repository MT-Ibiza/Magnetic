import { Button, Modal, Text } from '@magnetic/ui';

interface Props {
  onCancel: () => void;
}

function OrderCreated(props: Props) {
  const { onCancel } = props;

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Order Created</h2>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="px-10 py-5 flex flex-col gap-5">
          <Text>
            Your order has been successfully created. We'll be in touch with you
            soon!
          </Text>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-3 w-full">
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

export default OrderCreated;
