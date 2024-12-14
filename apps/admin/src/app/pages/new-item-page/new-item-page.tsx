import { CardWrapper, Text } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormItem from '../../components/services/form-item';

export function NewServicePage() {
  const params = useParams();
  const serviceId = Number(params.serviceId);
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
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        New Item
      </Text>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/services">Services</a>
          </li>
          <li> 
            <a href={`/services/${serviceId}`}>{service.name}</a>
          </li>
          <li>New Item</li>
        </ul>
      </div>
      <div className="bg-base-100 listingSection__wrap">
        <FormItem
          onCancel={() => {}}
          serviceId={serviceId}
          serviceCategories={[]}
          // item={selectedItem}
          onSave={() => {
            // toggleDrawer();
          }}
        />
      </div>
    </div>
  );
}

export default NewServicePage;
