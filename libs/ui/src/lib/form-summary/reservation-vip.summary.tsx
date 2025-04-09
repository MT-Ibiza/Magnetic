import {
  ReservationsFormData,
  WeeklyChefServiceFormData,
} from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate, formatTime } from '@magnetic/utils';

interface Props {
  formData: ReservationsFormData;
}
function ReservationVipSummary(props: Props) {
  const { formData } = props;

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text className="font-medium">Venue</Text>
          <Text className="text-gray-500">{formData.venue}</Text>
        </div>
        <div>
          <Text className="font-medium">Name</Text>
          <Text className="text-gray-500">{formData.clientName}</Text>
        </div>
        <div>
          <Text className="font-medium">Service</Text>
          <Text className="text-gray-500">{formData.service}</Text>
        </div>
        <div>
          <Text className="font-medium">Date</Text>
          <Text className="text-gray-500">{formatDate(formData.date)}</Text>
        </div>
        <div>
          <Text className="font-medium">Number of People</Text>
          <Text className="text-gray-500">{formData.numberOfPeople}</Text>
        </div>
      </div>
      <div className="mt-6">
        <Text className="font-medium">Comments</Text>
        <Text className="text-gray-500">{formData.comments || 'N/A'}</Text>
      </div>
    </div>
  );
}

export default ReservationVipSummary;
