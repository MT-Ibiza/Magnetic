import { Text } from '@magnetic/ui';
import moment from 'moment';

interface Props {
  formData: any;
}

export function FormJsonDetails(props: Props) {
  const { formData } = props;
  const keys = Object.keys(formData);

  const excludeFields = ['serviceId'];

  const fields = keys.filter((key) => !excludeFields.includes(key));

  const dictionary = {
    date: 'Date',
    time: 'Time',
    boat: 'Boat',
    extras: 'Extras',
    lunchReservation: 'Lunch Booking',
    service: 'Service',
    childrenAges: 'Children & Ages',
    location: 'Location',
    startTime: 'Start Time',
    numberOfPeople: 'Number Of People',
    dietaryComments: 'Dietary Comments',
    firstMealRequests: 'First Meal Requests',
    shoppingListRequests: 'Shopping List Requests',
    acceptSubstitutes: 'Accept Substitutes',
    contactName: 'Contact Name',
    flightNumber: 'Flight Number',
    contactNumber: 'Contact Number',
    luggageAmount: 'Luggage Amount',
    pickUpLocation: 'PickUp Location',
    dropOffLocation: 'Drop Off Location',
    comments: 'Comments',
    seabob: 'Seabod',
  };

  if (keys.length === 0) {
    return <Text className="text-gray-500">This form is pending</Text>;
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map((key, index) => (
        <div className="flex flex-col gap-1" key={index}>
          <h1 className="font-medium">{dictionary[key as 'date'] || key}</h1>
          {key === 'date' ? (
            <Text className="text-gray-500">
              {moment(formData[key]).utc().format('D MMM YYYY')}
            </Text>
          ) : (
            <Text className="text-gray-500">{formData[key] || '-'}</Text>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormJsonDetails;
