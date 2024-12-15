import { CardWrapper, Text } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormItem from '../../components/services/form-item';
import { useNewItem } from '../../hooks/useNewItem';

export function NewItemPage() {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const { isLoading, isError, service, categories, error } =
    useNewItem(serviceId);

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
          serviceCategories={categories}
          // item={selectedItem}
          onSave={() => {
            // toggleDrawer();
          }}
        />
      </div>
    </div>
  );
}

export default NewItemPage;
