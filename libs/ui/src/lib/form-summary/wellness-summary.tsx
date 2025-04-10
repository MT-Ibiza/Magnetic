import {
    OrderItem,
  WeeklyChefServiceFormData,
  WellnessFitnessFormData,
} from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate, formatTime } from '@magnetic/utils';

interface Props {
  formData: WellnessFitnessFormData;
    items: OrderItem[];

}
function WellnessSummary(props: Props) {
  const { formData, items } = props;
//   console.log('variants',items)
//   console.log('variant',items[0].variant?.name)


  return (
    <div className="p-10">
      <div>
        <Text className="font-medium">Number of People</Text>
        <Text className="text-gray-500">{items[0].variant?.name}</Text>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text className="font-medium">Service</Text>
          <Text className="text-gray-500">{formData.service}</Text>
        </div>
        <div>
          <Text className="font-medium">Date</Text>
          <Text className="text-gray-500">{formatDate(formData.date)}</Text>
        </div>
        <div>
          <Text className="font-medium">Time</Text>
          <Text className="text-gray-500">
            {formatTime(formData.time)}
          </Text>
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
    </div>
  );
}

export default WellnessSummary;
