import React from 'react';
import BoatSummary from './boat-summary';
import DrinksSummary from './drinks-summary';
import { BookingForm } from '@magnetic/interfaces';
import SingleChefsSummary from './single-chefs-summary';
import FormJsonDetails from '../form-json-details';
import TransferSummary from './transfer-summary';
import SpaBeautySummary from './spa-beauty-summary';
import SecuritySummary from './security-summary';
import ChildcareSummary from './childcare-summary';

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
    case 'transfer':
      return <TransferSummary formData={formData} />;
    case 'spa':
      return <SpaBeautySummary formData={formData} />;
    case 'security':
      return <SecuritySummary formData={formData} />;
    case 'childcare':
      return <ChildcareSummary formData={formData} />;

    default:
      return (
        <div className="p-10">
          <FormJsonDetails serviceType={booking.type} formData={formData} />
        </div>
      );
  }
}

export default RenderFormSummary;
