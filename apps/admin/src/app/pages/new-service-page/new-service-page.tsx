import { ErrorText } from '../../components/error-text';
import ServiceForm from '../../components/form-services';
import Loading from '../../components/loading';
import { usePackages } from '../../hooks/usePackages';

export function NewServicePage() {
  const { isLoading, isError, packages, error, isSuccess, refetch } =
    usePackages();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="new-booking-page">
      <h1 className="mb-8">New Service</h1>
      <ServiceForm packages={packages} />
    </div>
  );
}

export default NewServicePage;
