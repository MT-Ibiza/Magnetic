import { Badge, Button, CardWrapper } from '@magnetic/ui';
import { Link, useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { useAuth } from '../../hooks/useAuth';
import ListBoats from './list-boats';
import ListProducts from './list-products';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

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

  const publishedItems = service.items.filter((item) => item.published);
  const packageIds = service.packages.map((p) => p.id);
  const availableInPlan = packageIds.includes(user?.package?.id || -1);

  return (
    <CardWrapper>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl lg:text-2xl font-semibold">{service.name}</h1>
          <Badge size={3} color="yellow" name={service.packages[0].name} />
        </div>
        <div
          className="lg:text-[16px] text-[14px] editor-text"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        {service.script ? (
          <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
        ) : (
          <>
            {service.serviceType === 'boat_rental' ? (
              <ListBoats
                items={publishedItems}
                availableInPlan={availableInPlan}
              />
            ) : (
              <ListProducts
                items={publishedItems}
                availableInPlan={availableInPlan}
              />
            )}
          </>
        )}
        {/* {!service.script && (
          <div className="flex justify-end pt-[20px]">
            <Link to="/checkout">
              <Button className="py-[8px] text-[16px] w-full">
                Checkout Now
              </Button>
            </Link>
          </div>
        )} */}
      </div>
    </CardWrapper>
  );
}

export default ViewServicePage;
