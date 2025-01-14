import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useNavigate, useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import ServiceForm from '../../components/services/form-services';

interface Props {}

function EditServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const navigate = useNavigate();

  const { isLoading, isError, service, error } = useService(serviceId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  if (!service) {
    return <ErrorText text={'No service found'} />;
  }

  return (
    <div>
      <ServiceForm
        service={service}
        onSaveSuccess={() => {
          navigate(`/services/${service.id}`, { replace: true });
        }}
      />
    </div>
  );
}

export default EditServicePage;
