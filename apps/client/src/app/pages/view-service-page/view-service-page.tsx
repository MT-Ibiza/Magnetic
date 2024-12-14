import { Badge, CardWrapper, Text } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import ItemCardCounter from '../../components/items/item-card-counter';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const { isLoading, isError, service, error } = useService(serviceId);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (!service) {
    return <p>Service Not Found</p>;
  }

  return (
    <CardWrapper>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">{service.name}</h1>
          <Badge size={3} color="yellow" name={service.package.name} />
        </div>
        <div
          className="editor-text"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        <Text className="text-lg font-bold my-4">Choose your favorites</Text>
        <div className="grid grid-cols-1 gap-4">
          {service.items.map((item, index) => (
            <ItemCardCounter key={index} item={item} />
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}

export default ViewServicePage;
