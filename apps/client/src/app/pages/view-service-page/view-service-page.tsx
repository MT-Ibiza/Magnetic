import { CardWrapper, Text } from '@magnetic/ui';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { Item } from '@magnetic/interfaces';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { isLoading, isError, service, error } = useService(serviceId);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

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
        <h1>{service.name}</h1>
        <span>{service.package.name}</span>
        <div
          className="editor-text"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        <Text className="my-4">Products</Text>
        <div className="flex flex-wrap gap-3">
          {service.items.map((service, index) => (
            <div key={index} className="border border-md p-5">
              {service.name}
            </div>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}

export default ViewServicePage;
