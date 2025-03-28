import TransferBookingForm from './transfer-booking-form';
import DrinksDeliveryBookingForm from './drinks-delivery-form';
import WeeklyChefServiceForm from './weekly-chef-service';
import SpaBeautyBookingForm from './spa-beauty-form';
import SecurityBookingForm from './security-form';
import ChildcareBookingForm from './childcare-booking-form';
import WeeklyButlerServiceForm from './weekly-butler-form';
import SingleChefServiceForm from './single-chef-service';
import { FormSubmitParams, Item, CurrentUser } from '@magnetic/interfaces';
import BoatCharterBookingForm from './boat-charter-form';

interface Props {
  type: string;
  formData?: any;
  onSubmit: (data: FormSubmitParams<any>) => void;
  onClose?: () => void;
  item?: Item;
  user?: CurrentUser;
  apiUrl: string;
}

export function RenderBookingForm(props: Props) {
  const { type, onSubmit, formData, onClose, item, user, apiUrl } = props;
  const URL_SEARCH_BOAT_AVAILABILITY = `${apiUrl}/boats/availability`;

  switch (type) {
    case 'drinks':
      return (
        <DrinksDeliveryBookingForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'chef-single':
      return (
        <SingleChefServiceForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'chef-weekly':
      return (
        <WeeklyChefServiceForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'chef-weekly-waiter':
      return (
        <WeeklyButlerServiceForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'transfer':
      return (
        <TransferBookingForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      );
    case 'boat_rental':
      return (
        <BoatCharterBookingForm
          urlApi={URL_SEARCH_BOAT_AVAILABILITY}
          item={item}
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
    default:
      return <div></div>;
  }
}

export default RenderBookingForm;
