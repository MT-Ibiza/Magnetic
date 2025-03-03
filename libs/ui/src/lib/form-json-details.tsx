import { Text } from '@magnetic/ui';

interface Props {
  formData: any;
}

export function FormJsonDetails(props: Props) {
  const { formData } = props;
  const keys = Object.keys(formData);

  const dictionary = {
    date: 'Date',
    time: 'Time',
    boat: 'Boat',
    extras: 'Extras',
    lunchReservation: 'Lunch Booking',
    service: 'Service',
    kidsAges: 'kids Ages',
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
  };

  if (keys.length === 0) {
    return <Text className="text-gray-500">This form is pending</Text>;
  }

  return (
    <div className="flex flex-col gap-3">
      {keys.map((key) => (
        <div className="flex gap-2">
          <h1 className="font-medium">{dictionary[key as 'date'] || key}:</h1>
          <div className="text-neutral-6000 dark:text-neutral-300">
            {formData[key]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormJsonDetails;
