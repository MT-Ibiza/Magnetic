import React from 'react';
import BoatSummary from './boat-summary';
import DrinksSummary from './drinks-summary';
import { BookingForm } from '@magnetic/interfaces';

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
    default:
      return <div></div>;
  }
}

export default RenderFormSummary;
