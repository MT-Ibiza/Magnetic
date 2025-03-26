import React from 'react';
import BoatSummary from './boat-summary';
import DrinksSummary from './drinks-summary';
import { BookingForm } from '@magnetic/interfaces';
import SingleChefsSummary from './single-chefs-summary';
import FormJsonDetails from '../form-json-details';

interface Props {
  booking: BookingForm;
}

export function RenderFormSummary(props: Props) {
  const { booking } = props;
  const {
    type,
    formData,
    // order: { items },
  } = booking;

  switch (type) {
    case 'boat_rental':
      return <BoatSummary formData={formData} />;
    case 'drinks':
      return <DrinksSummary formData={formData} items={[]} />;
    case 'chef-single':
      return <SingleChefsSummary formData={formData} />;
    default:
      return (
        <div className="p-10">
          <FormJsonDetails serviceType={booking.type} formData={formData} />
        </div>
      );
  }
}

export default RenderFormSummary;
