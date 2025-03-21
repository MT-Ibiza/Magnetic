import { Text } from '@magnetic/ui';
import moment from 'moment';

interface Props {
  formData: any;
  serviceType: string;
}

export function FormJsonDetails(props: Props) {
  const { formData, serviceType } = props;
  const keys = Object.keys(formData);

  const excludeFields = ['serviceId'];
  const serviceOrder: Record<string, string[]> = {
    boat_rental: [
      'date',
      'boat',
      'time',
      'numberOfPeople',
      'kidsAges',
      'lunchReservation',
      'seabob',
      'comments',
    ],
    transfer: [
      'date',
      'time',
      'pickUpLocation',
      'dropOffLocation',
      'numberOfPeople',
      'childSeats',
      'contactName',
      'contactNumber',
      'flightNumber',
      'luggageAmount',
    ],
  };
  const orderedFields = serviceOrder[serviceType] || keys;
  const fields = orderedFields.filter(
    (key) => key in formData && !excludeFields.includes(key)
  );

  const dictionary: Record<string, string> = {
    date: 'Date',
    boat: 'Boat',
    time: 'Time',
    extras: 'Extras',
    lunchReservation: 'Lunch Booking',
    service: 'Service',
    childrenAges: 'Children & Ages',
    location: 'Location',
    startTime: 'Start Time',
    numberOfPeople: 'Number Of People',
    numberOfWeeks: 'Number Of Weeks',
    dietaryComments: 'Dietary Comments',
    firstMealRequests: 'First Meal Requests',
    shoppingListRequests: 'Shopping List Requests',
    commentsPreference: 'Comments & Preference',
    acceptSubstitutes: 'Accept Substitutes',
    contactName: 'Contact Name',
    flightNumber: 'Flight Number',
    contactNumber: 'Contact Number',
    luggageAmount: 'Luggage Amount',
    pickUpLocation: 'PickUp Location',
    dropOffLocation: 'Drop Off Location',
    comments: 'Comments',
    seabob: 'Seabod',
    childSeats: 'Child Seats',
    kidsAges: 'Kids & Ages',
  };

  if (keys.length === 0) {
    return <Text className="text-gray-500">This form is pending</Text>;
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map((key, index) => {
        let value;
        switch (key) {
          case 'date':
            value = moment(formData[key]).utc().format('D MMM YYYY');
            break;
          case 'acceptSubstitutes':
          case 'seabob':
            value = formData[key] === 'true' ? 'Yes' : 'No';
            break;
          default:
            value = formData[key]?.toString() || '-';
        }
        return (
          <div className="flex flex-col gap-1" key={index}>
            <h1 className="font-medium">{dictionary[key] || key}</h1>
            <Text className="text-gray-500">{value}</Text>
          </div>
        );
      })}
    </div>
  );
}

export default FormJsonDetails;
