import { TransferFormData } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { formatDate, formatTime } from '@magnetic/utils';

interface Props {
  formData: TransferFormData;
}
function TransferSummary(props: Props) {
  const { formData } = props;

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text className="font-medium">Date</Text>
          <Text className="text-gray-500">{formatDate(formData.date)}</Text>
        </div>
        <div>
          <Text className="font-medium">Time</Text>
          <Text className="text-gray-500">{formData.time}</Text>
        </div>
        <div>
          <Text className="font-medium">Pick-up Location</Text>
          <Text className="text-gray-500">{formData.pickUpLocation}</Text>
        </div>
        <div>
          <Text className="font-medium">Drop-off Location</Text>
          <Text className="text-gray-500">{formData.dropOffLocation}</Text>
        </div>
        <div>
          <Text className="font-medium">Number of People</Text>
          <Text className="text-gray-500">{formData.numberOfPeople}</Text>
        </div>
        <div>
          <Text className="font-medium">Child Seats</Text>
          <Text className="text-gray-500">{formData.childSeats}</Text>
        </div>
        <div>
          <Text className="font-medium">Contact Name</Text>
          <Text className="text-gray-500">{formData.contactName}</Text>
        </div>
        <div>
          <Text className="font-medium">Contact Number</Text>
          <Text className="text-gray-500">{formData.contactNumber}</Text>
        </div>
        <div>
          <Text className="font-medium">Flight Number</Text>
          <Text className="text-gray-500">{formData.flightNumber}</Text>
        </div>
        <div>
          <Text className="font-medium">Luggage Amount</Text>
          <Text className="text-gray-500">{formData.luggageAmount}</Text>
        </div>
      </div>
    </div>
  );
}

export default TransferSummary;
