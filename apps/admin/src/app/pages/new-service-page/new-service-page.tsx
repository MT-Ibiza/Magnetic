import { Text } from '@magnetic/ui';
import ServiceForm from '../../components/services/form-services';
import { useNavigate } from 'react-router-dom';

export function NewServicePage() {
  const navigate = useNavigate();

  return (
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        New Service
      </Text>
      <ServiceForm
        onSaveSuccess={() => {
          navigate(`/services`, { replace: true });
        }}
      />
    </div>
  );
}

export default NewServicePage;
