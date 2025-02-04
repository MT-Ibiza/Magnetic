import { CardWrapper, Text } from '@magnetic/ui';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormItem from '../../components/services/form-item';
import { useNewItem } from '../../hooks/useNewItem';
import FormBoat from '../../components/form-boat';
import FormBoatItem from '../../components/services/form-boat-item';
import FormDrinkItem from '../../components/services/form-drink-item';

export function NewItemPage() {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const navigate = useNavigate();

  const otherForms = ['drinks', 'boat_rental'];

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
        New Product
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
        {service.serviceType === 'boat_rental' && (
          <FormBoatItem
            serviceId={serviceId}
            onSave={() => {
              navigate(`/services/${serviceId}`, { replace: true });
            }}
            serviceCategories={categories}
          />
        )}
        {service.serviceType === 'drinks' && (
          <FormDrinkItem
            serviceId={serviceId}
            onSave={() => {
              navigate(`/services/${serviceId}`, { replace: true });
            }}
            serviceCategories={categories}
          />
        )}
        {!otherForms.includes(service.serviceType) && (
          <FormItem
            serviceId={serviceId}
            serviceCategories={categories}
            service={service}
            // item={selectedItem}
            onSave={() => {
              navigate(`/services/${serviceId}`, { replace: true });
              // toggleDrawer();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default NewItemPage;
