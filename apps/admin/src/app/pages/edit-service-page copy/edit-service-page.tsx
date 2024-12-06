import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import FormServices from '../../components/services/form-services';

interface Props {}

function EditServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');

  const { isLoading, isError, service, error } = useService(serviceId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div>
      <FormServices service={service} />
    </div>
  );
}

export default EditServicePage;
