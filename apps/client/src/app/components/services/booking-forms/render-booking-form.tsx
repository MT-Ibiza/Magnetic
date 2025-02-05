import React from 'react';
import TransferBookingForm from './transfer-booking-form';
import DrinksDeliveryBookingForm from './drinks-delivery-form';
import WeeklyChefServiceForm from './weekly-chef-service';
import BoatCharterBookingForm from './boat-charter-form';
import SpaBeautyBookingForm from './spa-beauty-form';
import SecurityBookingForm from './security-form';
import ChildcareBookingForm from './childcare-booking-form';
import { OrderBookingForm } from '@magnetic/interfaces';

interface Props {
  type: string;
  itemId?: number;
  formData?: OrderBookingForm;
  onSubmit: (data: any) => void;
}

function RenderBookingForm(props: Props) {
  const { type, itemId, onSubmit, formData } = props;
  return (
    <div>
      {type === 'none' && <div></div>}
      {type === 'transfer' && (
        <TransferBookingForm onSubmit={onSubmit} formData={formData} />
      )}
      {type === 'drinks' && (
        <DrinksDeliveryBookingForm onSubmit={onSubmit} formData={formData} />
      )}
      {type === 'food' && <div></div>}
      {type === 'chefs' && (
        <WeeklyChefServiceForm onSubmit={onSubmit} formData={formData} />
      )}
      {type === 'boat_rental' && (
        <BoatCharterBookingForm onSubmit={onSubmit} formData={formData} />
      )}
      {type === 'spa' && <SpaBeautyBookingForm onSubmit={onSubmit} />}
      {type === 'security' && <SecurityBookingForm onSubmit={onSubmit} />}
      {type === 'childcare' && <ChildcareBookingForm onSubmit={onSubmit} />}
    </div>
  );
}

export default RenderBookingForm;
