import { ChildcareFormData, SecurityFormData } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate, formatTime } from '@magnetic/utils';

interface Props {
  formData: ChildcareFormData;
}
function ChildcareSummary(props: Props) {
  const { formData } = props;

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text className="font-medium">Number of hours</Text>
          <Text className="text-gray-500">{formData.hours}</Text>
        </div>
        <div>
          <Text className="font-medium">Number of Babysitters</Text>
          <Text className="text-gray-500">{formData.numberOfBabysitters}</Text>
        </div>
        <div>
          <Text className="font-medium">Service</Text>
          <Text className="text-gray-500">{formData.service}</Text>
        </div>
        <div>
          <Text className="font-medium">Children & Ages</Text>
          <Text className="text-gray-500">{formData.childrenAges}</Text>
        </div>
        <div>
          <Text className="font-medium">Date</Text>
          <Text className="text-gray-500">{formData.date}</Text>
        </div>
        <div>
          <Text className="font-medium">Start Time</Text>
          <Text className="text-gray-500">{formData.time}</Text>
        </div>
        <div>
          <Text className="font-medium">Location</Text>
          <Text className="text-gray-500">{formData.location}</Text>
        </div>
      </div>
      <div className="mt-6">
        <Text className="font-medium">Comments</Text>
        <Text className="text-gray-500">{formData.comments}</Text>
      </div>
      <div className="mt-6">
        <Text className="font-medium">Disclaimer Accepted</Text>
        <Text className="text-gray-500">{formData.disclaimerAccepted ? 'Yes' : 'No'}</Text>
      </div>
    </div>
  );
}

export default ChildcareSummary;
