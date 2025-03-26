import { BoatCharterFormData } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate, formatTime } from '@magnetic/utils';

interface Props {
  formData: BoatCharterFormData;
}

function BoatSummary(props: Props) {
  const { formData } = props;

  return (
    <div>
      <div className="flex flex-col gap-6 p-6 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="font-medium">Date</Text>
            <Text className="text-gray-500">{formatDate(formData.date)}</Text>
          </div>
          <div>
            <Text className="font-medium">Start Time</Text>
            <Text className="text-gray-500">
              {formatTime(formData.startTime)}
            </Text>
          </div>
          <div>
            <Text className="font-medium">Number of People</Text>
            <Text className="text-gray-500">{formData.numberOfPeople}</Text>
          </div>
          <div>
            <Text className="font-medium">Children & Ages</Text>
            <Text className="text-gray-500">{formData.childrenAges}</Text>
          </div>
        </div>
        <div>
          <Text className="font-medium">Lunch Reservation</Text>
          <Text className="text-gray-500">{formData.lunchReservation || "No lunch reservation"}</Text>
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text className="font-medium">Comments</Text>
          <Text className="text-gray-500">{formData.comments || 'No comments'}</Text>
        </div>
        <div>
          <Text className="font-medium">Add Seabob</Text>
          <Text className="text-gray-500">
            {formData.seabob ? 'Yes' : 'No'}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default BoatSummary;
