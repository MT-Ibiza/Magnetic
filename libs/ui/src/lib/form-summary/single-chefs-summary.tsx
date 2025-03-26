import { SingleChefServiceFormData } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate, formatTime } from '@magnetic/utils';

interface Props {
  formData: SingleChefServiceFormData;
}
function SingleChefsSummary(props: Props) {
  const { formData } = props;

  return (
    <div className="p-10">
      <div className="mb-6">
        <Text className="font-medium">Number of People</Text>
        <Text className="text-gray-500">{formData.numberOfPeople}</Text>
      </div>
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
          <Text className="font-medium">Children & Ages</Text>
          <Text className="text-gray-500">{formData.kidsAges}</Text>
        </div>
        <div>
          <Text className="font-medium">Location</Text>
          <Text className="text-gray-500">{formData.location}</Text>
        </div>
      </div>
      <div className="mt-6">
        <Text className="font-medium">Preferences & Dietary Requirements</Text>
        <Text className="text-gray-500">{formData.dietaryComments}</Text>
      </div>
    </div>
  );
}

export default SingleChefsSummary;
