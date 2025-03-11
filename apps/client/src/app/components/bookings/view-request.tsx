import { Button, Text } from '@magnetic/ui';
import Modal from '../modal';

interface Props {
  message: string;
  onCancel: () => void;
}

function ViewRequest(props: Props) {
  const { message, onCancel } = props;
  return (
    <div>
      <Modal.Header>Message</Modal.Header>
      <Modal.Body>
        <div className="p-10">
          <Text>{message}</Text>
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

export default ViewRequest;
