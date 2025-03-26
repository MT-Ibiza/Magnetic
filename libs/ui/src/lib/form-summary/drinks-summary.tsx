import { Text } from '@magnetic/ui';
import { formatDate } from '@magnetic/utils';
import { DrinksDeliveryFormData } from '../forms/drinks-delivery-form';
import { OrderItem } from '@magnetic/interfaces';

interface Props {
  formData: DrinksDeliveryFormData;
  items: OrderItem[];
}

function DrinksSummary(props: Props) {
  const { formData, items } = props;

  return (
    <div>
      <div className="flex flex-col gap-6 p-6 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Date</Text>
            <Text className="text-gray-500">{formatDate(formData.date)}</Text>
          </div>
          <div>
            <Text className="mb-2">Location</Text>
            <Text className="text-gray-500">{formData.location}</Text>
          </div>
        </div>
        <div>
          <Text className="mb-2">Accept Substitutes</Text>
          <Text className="text-gray-500">
            {formData.acceptSubstitutes ? 'Yes' : 'No'}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default DrinksSummary;
