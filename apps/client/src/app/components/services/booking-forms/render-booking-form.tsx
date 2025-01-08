import React from 'react';
import TransferBookingForm from './transfer-booking-form';
import DrinksDeliveryBookingForm from './drinks-delivery-form';
import WeeklyChefServiceForm from './weekly-chef-service';
import BoatCharterBookingForm from './boat-charter-form';
import SpaBeautyBookingForm from './spa-beauty-form';
import SecurityBookingForm from './security-form';
import ChildcareBookingForm from './childcare-booking-form';

interface Props {
  type: string;
}

function RenderBookingForm(props: Props) {
  const { type } = props;

  return (
    <div>
      {type === 'none' && <div></div>}
      {type === 'transfer' && <TransferBookingForm onSubmit={() => {}} />}
      {type === 'drinks' && <DrinksDeliveryBookingForm onSubmit={() => {}} />}
      {type === 'food' && <div></div>}
      {type === 'chefs' && <WeeklyChefServiceForm onSubmit={() => {}} />}
      {type === 'boat_rental' && <BoatCharterBookingForm onSubmit={() => {}} />}
      {type === 'spa' && <SpaBeautyBookingForm onSubmit={() => {}} />}
      {type === 'security' && <SecurityBookingForm onSubmit={() => {}} />}
      {type === 'childcare' && <ChildcareBookingForm onSubmit={() => {}} />}
    </div>
  );
}

export default RenderBookingForm;
