import { useState } from 'react';
import { Button, Modal } from '@magnetic/ui';
import { getCurrentClient } from '../../apis/api-client';
import { userCanMakeBooking } from '@magnetic/utils';
import NoBookings from '../messages/no-bookings';

interface Props {
  onClick: () => void;
  size?: number;
  radius?: string;
}

function BookButton(props: Props) {
  const { onClick, size, radius } = props;
  const [openModal, setOpenModal] = useState(false);
  const [isOutDated, setIsOutDated] = useState(false);

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  async function checkIfCanBook() {
    const user = await getCurrentClient();
    const isValid = userCanMakeBooking(user.arrivalDate);
    if (isValid) {
      onClick();
    } else {
      setIsOutDated(!isValid);
      toggleModal();
    }
  }

  return (
    <>
      <Button
        size={size as 1}
        radius={radius as 'full'}
        onClick={checkIfCanBook}
      >
        Book Now
      </Button>
      {isOutDated && (
        <Modal open={openModal}>
          <NoBookings onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
}

export default BookButton;
