import { Text } from '@magnetic/ui';
import ServiceForm from '../../components/services/form-services';

export function EditItemPage() {
  return (
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        New Service
      </Text>
      <ServiceForm />
    </div>
  );
}

export default EditItemPage;
