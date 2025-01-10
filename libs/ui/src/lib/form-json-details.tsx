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
    Boat: 'Boat',
    extras: 'Extras',
    lunchBooking: 'Lunch Booking',
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
    return (
      <Text className="text-gray-500">
        The client has not yet filled out the form
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {keys.map((key) => (
        <div className="flex gap-2">
          <h1>{dictionary[key as 'date'] || key}:</h1>
          <div>{formData[key]}</div>
        </div>
      ))}
    </div>
  );
}

export default FormJsonDetails;
