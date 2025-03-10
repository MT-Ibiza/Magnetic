import { Text } from '@magnetic/ui';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useNavigate, useParams } from 'react-router-dom';
import FormItem from '../../components/services/form-item';
import { useItem } from '../../hooks/useItem';
import FormBoatItem from '../../components/services/form-boat-item';
import FormDrinkItem from '../../components/services/form-drink-item';
import FormTransferItem from '../../components/services/form-transfer-item';

export function EditItemPage() {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const itemId = Number(params.itemId);
  const navigate = useNavigate();
  const otherForms = ['drinks', 'boat_rental', 'transfer'];

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
  console.log(item);
  return (
    <div className="new-booking-page">
      <Text size="4" className="mb-3">
        Edit Product
      </Text>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href={`/services/${serviceId}`}>{item.service.name}</a>
          </li>
          <li>Edit Product</li>
        </ul>
      </div>
      <div className="bg-base-100 listingSection__wrap">
        {item.service.serviceType === 'boat_rental' && (
          <FormBoatItem
            item={item}
            serviceId={serviceId}
            onSave={() => {
              navigate(`/services/${serviceId}`, { replace: true });
            }}
            serviceCategories={serviceCategories}
          />
        )}
        {item.service.serviceType === 'drinks' && (
          <FormDrinkItem
            item={item}
            serviceId={serviceId}
            onSave={() => {
              navigate(`/services/${serviceId}`, { replace: true });
            }}
            serviceCategories={serviceCategories}
          />
        )}
        {item.service.serviceType === 'transfer' && (
          <FormTransferItem
            item={item}
            serviceId={serviceId}
            onSave={() => {
              navigate(`/services/${serviceId}`, { replace: true });
            }}
            serviceCategories={serviceCategories}
          />
        )}
        {!otherForms.includes(item.service.serviceType) && (
          <FormItem
            serviceCategories={serviceCategories}
            serviceId={serviceId}
            item={item}
            onSave={() => {
              navigate(`/services/${serviceId}`);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EditItemPage;
