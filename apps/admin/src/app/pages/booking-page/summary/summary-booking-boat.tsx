import { BoatCharterFormData } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate } from '../../../utils';

interface Props {
  formData: BoatCharterFormData;
}

function SummaryBookingBoat(props: Props) {
  const { formData } = props;
  const {
    date,
    boat,
    numberOfPeople,
    childrenAges,
    startTime,
    lunchReservation,
    comments,
    seabob,
    depositPaid,
  } = formData;

  return (
    <div>
      <div className="flex gap-5">
        <div className="w-full">
          <label>Date</label>
          <Text>{formatDate(date)}</Text>
        </div>
        <div className="w-full">
          <label>Start Time</label>
          <Text>{formatDate(startTime)}</Text>
        </div>
      </div>
    </div>
  );
}

export default SummaryBookingBoat;
