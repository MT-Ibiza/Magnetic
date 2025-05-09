import React from 'react';
import BoatSummary from './boat-summary';
import DrinksSummary from './drinks-summary';
import { BookingForm, OrderItem } from '@magnetic/interfaces';
import SingleChefsSummary from './single-chefs-summary';
import FormJsonDetails from '../form-json-details';
import TransferSummary from './transfer-summary';
import SpaBeautySummary from './spa-beauty-summary';
import SecuritySummary from './security-summary';
import ChildcareSummary from './childcare-summary';
import WeeklyChefsSummary from './weekly-chef-summary';
import WeeklyChefsButlerSummary from './chef-weekly-butler-summary';
import ReservationRestaurantSummary from './reservations-restaurant-summary';
import ReservationVipSummary from './reservation-vip.summary';
import WellnessSummary from './wellness-summary';

interface Props {
  booking: BookingForm;
  items: OrderItem[];
}

export function RenderFormSummary(props: Props) {
  const { booking, items } = props;
  const { type, formData } = booking;
  switch (type) {
    case 'boat_rental':
      return <BoatSummary formData={formData} />;
    case 'drinks':
      return <DrinksSummary formData={formData} items={items} />;
    case 'transfer':
      return <TransferSummary formData={formData} />;
    case 'spa':
      return <SpaBeautySummary formData={formData} />;
    case 'security':
      return <SecuritySummary formData={formData} />;
    case 'childcare':
      return <ChildcareSummary formData={formData} />;
    case 'chef-single':
      return <SingleChefsSummary formData={formData} />;
    case 'chef-weekly':
      return <WeeklyChefsSummary formData={formData} />;
    case 'wellness':
      return <WellnessSummary formData={formData} items={items} />;
    case 'reservations':
      const name = formData?.service?.toLowerCase() || '';
      if (name.includes('restaurant') || name.includes('beach')) {
        return <ReservationRestaurantSummary formData={formData} />;
      } else if (
        name.includes('vip') ||
        name.includes('nightclub') ||
        name.includes('night club')
      ) {
        return <ReservationVipSummary formData={formData} />;
      }
      return <div></div>;
    case 'chef-weekly-waiter':
      return <WeeklyChefsButlerSummary formData={formData} />;
    default:
      return (
        <div className="p-10">
          <FormJsonDetails serviceType={booking.type} formData={formData} />
        </div>
      );
  }
}

export default RenderFormSummary;
