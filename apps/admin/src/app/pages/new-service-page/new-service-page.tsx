import { Text } from '@magnetic/ui';
import ServiceForm from '../../components/form-services';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useNewServiceData } from '../../hooks/useNewServiceData';

export function NewServicePage() {
  const { isLoading, isError, data, error } = useNewServiceData();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        New Service
      </Text>
      <ServiceForm providers={data?.providers || []} />
    </div>
  );
}

export default NewServicePage;
