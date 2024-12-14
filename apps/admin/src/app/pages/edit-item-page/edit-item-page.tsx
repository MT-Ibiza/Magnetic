import { Text } from '@magnetic/ui';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import FormItem from '../../components/services/form-item';
import { useItem } from '../../hooks/useItem';

export function EditItemPage() {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const itemId = Number(params.itemId);

  const { isLoading, isError, item, serviceCategories, error } = useItem(
    serviceId,
    itemId
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  if (!item) {
    return <Text>Item Not Found</Text>;
  }

  return (
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        Edit Item
      </Text>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href={`/services/${serviceId}`}>{item.service.name}</a>
          </li>
          <li>Edit Item</li>
        </ul>
      </div>
      <div className="bg-base-100 listingSection__wrap">
        <FormItem
          onCancel={() => {}}
          serviceCategories={serviceCategories}
          serviceId={serviceId}
          item={item}
          onSave={() => {
            // toggleDrawer();
          }}
        />
      </div>
    </div>
  );
}

export default EditItemPage;
