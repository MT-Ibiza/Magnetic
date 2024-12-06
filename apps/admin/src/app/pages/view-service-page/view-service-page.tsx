import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import FormServices from '../../components/form-services';
import { Button, Input, Text, UploadImage } from '@magnetic/ui';
import HtmlText from '../../components/html-text';

interface Props {}

function ViewServicePage(props: Props) {
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

  if (!service) {
    return <Text>Service Not Found</Text>;
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <span>{service.package.name}</span>
      <div
        className="editor-text"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />
    </div>
  );
}

export default ViewServicePage;
