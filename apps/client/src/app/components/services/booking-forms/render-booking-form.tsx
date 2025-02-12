import TransferBookingForm from './transfer-booking-form';
import DrinksDeliveryBookingForm from './drinks-delivery-form';
import WeeklyChefServiceForm from './weekly-chef-service';
import BoatCharterBookingForm from './boat-charter-form';
import SpaBeautyBookingForm from './spa-beauty-form';
import SecurityBookingForm from './security-form';
import ChildcareBookingForm from './childcare-booking-form';
import WeeklyButlerServiceForm from './weekly-butler-form';
import SingleChefServiceForm from './single-chef-service';

interface Props {
  type: string;
  itemId?: number;
  formData?: any;
  onSubmit: (data: any) => void;
  viewCol?: boolean;
  onClose?: () => void;
}

function RenderBookingForm(props: Props) {
  const { type, itemId, onSubmit, formData, viewCol, onClose } = props;
  return (
    <div>
      {type === 'none' && <div></div>}
      {type === 'transfer' && (
        <TransferBookingForm
          onSubmit={onSubmit}
          formData={formData}
          viewCol={viewCol}
          onCancel={onClose}
        />
      )}
      {type === 'drinks' && (
        <DrinksDeliveryBookingForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'food' && <div></div>}
      {/* {type === 'chefs' && (
        <WeeklyChefServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )} */}
      {type === 'chef-single' && (
        <SingleChefServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'chef-weekly' && (
        <WeeklyChefServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'chef-weekly-waiter' && (
        <WeeklyButlerServiceForm
          onSubmit={onSubmit}
          formData={formData}
          onCancel={onClose}
        />
      )}
      {type === 'boat_rental' && (
        <BoatCharterBookingForm
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
