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
}

export function RenderBookingForm(props: Props) {
  const { type, onSubmit, formData, onClose, item, user } = props;
  return (
    <div>
      {type === 'none' && <div></div>}
      {type === 'transfer' && (
        <TransferBookingForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'drinks' && (
        <DrinksDeliveryBookingForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'food' && <div></div>}
      {type === 'chef-single' && (
        <SingleChefServiceForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'chef-weekly' && (
        <WeeklyChefServiceForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'chef-weekly-waiter' && (
        <WeeklyButlerServiceForm
          item={item}
          user={user}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'boat_rental' && (
        <BoatCharterBookingForm
          item={item}
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'spa' && <SpaBeautyBookingForm onSubmit={onSubmit} />}
      {type === 'security' && <SecurityBookingForm onSubmit={onSubmit} />}
      {type === 'childcare' && <ChildcareBookingForm onSubmit={onSubmit} />}
    </div>
  );
}

export default RenderBookingForm;
