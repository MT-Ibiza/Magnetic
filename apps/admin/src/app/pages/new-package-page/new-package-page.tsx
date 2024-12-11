import { Text } from '@magnetic/ui';
import PackagesForm from '../../components/services/form-packages';

export function NewServicePage() {
  return (
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        New Package
      </Text>
      <PackagesForm />
    </div>
  );
}

export default NewServicePage;
