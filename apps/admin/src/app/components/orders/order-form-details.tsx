import { Text } from '@magnetic/ui';
import React from 'react';

interface Props {
  formData: any;
}

function OrderFormDetails(props: Props) {
  const { formData } = props;
  const keys = Object.keys(formData);

  const dictionary = {
    date: 'Date',
    time: 'Time',
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

export default OrderFormDetails;
