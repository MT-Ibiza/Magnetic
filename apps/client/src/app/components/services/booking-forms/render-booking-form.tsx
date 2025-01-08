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
  itemId?: number;
  onSubmit: (data: any) => void;
}

function RenderBookingForm(props: Props) {
  const { type, itemId, onSubmit } = props;
  return (
    <div>
      {type === 'none' && <div></div>}
      {type === 'transfer' && <TransferBookingForm onSubmit={onSubmit} />}
      {type === 'drinks' && <DrinksDeliveryBookingForm onSubmit={onSubmit} />}
      {type === 'food' && <div></div>}
      {type === 'chefs' && <WeeklyChefServiceForm onSubmit={onSubmit} />}
      {type === 'boat_rental' && <BoatCharterBookingForm onSubmit={onSubmit} />}
      {type === 'spa' && <SpaBeautyBookingForm onSubmit={onSubmit} />}
      {type === 'security' && <SecurityBookingForm onSubmit={onSubmit} />}
      {type === 'childcare' && <ChildcareBookingForm onSubmit={onSubmit} />}
    </div>
  );
}

export default RenderBookingForm;
