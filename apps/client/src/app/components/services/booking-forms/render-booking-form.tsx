import TransferBookingForm from './transfer-booking-form';
import DrinksDeliveryBookingForm from './drinks-delivery-form';
import WeeklyChefServiceForm from './weekly-chef-service';
import BoatCharterBookingForm from './boat-charter-form';
import SpaBeautyBookingForm from './spa-beauty-form';
import SecurityBookingForm from './security-form';
import ChildcareBookingForm from './childcare-booking-form';
import WeeklyButlerServiceForm from './weekly-butler-form';
import SingleChefServiceForm from './single-chef-service';
import { FormSubmitParams } from '@magnetic/interfaces';

interface Props {
  type: string;
  formData?: any;
  onSubmit: (data: FormSubmitParams<any>) => void;
  onClose?: () => void;
}

function RenderBookingForm(props: Props) {
  const { type, onSubmit, formData, onClose } = props;

  switch (type) {
    case 'drinks':
      return (
        <DrinksDeliveryBookingForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'chef-single':
      return (
        <SingleChefServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'chef-weekly':
      return (
        <WeeklyChefServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'chef-weekly-waiter':
      return (
        <WeeklyButlerServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'transfer':
      return (
        <TransferBookingForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'wellness':
      return <div></div>;
    case 'spa':
      return <SpaBeautyBookingForm onSubmit={onSubmit} />;
    case 'childcare':
      return <ChildcareBookingForm onSubmit={onSubmit} />;
    case 'security':
      return <SecurityBookingForm onSubmit={onSubmit} />;
    case 'boat_rental':
      return (
        <BoatCharterBookingForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    default:
      return <div></div>;
  }
}

export default RenderBookingForm;
