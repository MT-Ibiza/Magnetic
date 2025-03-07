import { BoatCharterFormData, BookingForm } from '@magnetic/interfaces';
import { FormJsonDetails } from '@magnetic/ui';

interface Props {
  booking: BookingForm;
}

function BoatBookingSummary(props: Props) {
  const { booking } = props;
  const { formData } = booking;
  return <FormJsonDetails formData={formData} />;
}

export default BoatBookingSummary;
