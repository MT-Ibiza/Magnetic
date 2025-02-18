import { Badge, CardWrapper } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { useAuth } from '../../hooks/useAuth';
import ListProducts from './list-products';
import NoticeBookingUnavailable from '../../components/notice-booking-unavailable';
import ListBoats from './list-boats';
import './styles.scss';
import { placeholderItemImage } from '../../constants';

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

  const publishedItems = service.items;
  const packageIds = service.packages.map((p) => p.id);
  const availableInPlan = packageIds.includes(user?.package?.id || -1);

  return (
    <CardWrapper>
      <NoticeBookingUnavailable arrivalDate={user?.arrivalDate} />
      <div className="listingSection__wrap mb-3">
        <div>
          <h2 className="text-2xl font-semibold">{service.name}</h2>
          <div className="leading-relaxed editor-text">
            <div
              className="text-neutral-6000 dark:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-[450px]">
            <img
              className="object-cover rounded-md w-full  max-h-[300px]"
              src={service.imageUrl ? service.imageUrl : placeholderItemImage}
              alt={service.name}
            />
          </div>
          <div>
            {service.instructions && (
              <>
                <div className="leading-relaxed editor-text">
                  <h4 className="text-lg font-semibold">Instructions</h4>
                  <div
                    className="mt-3 text-neutral-6000 dark:text-neutral-300"
                    dangerouslySetInnerHTML={{ __html: service.instructions }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {service.script ? (
        <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
      ) : (
        <>
          {service.serviceType === 'boat_rental' ? (
            <ListBoats availableInPlan={true} service={service} />
          ) : (
            <div className="bg-gray-50 py-5 px-10 rounded-md">
              <ListProducts
                service={service}
                items={publishedItems}
                availableInPlan={availableInPlan}
              />
            </div>
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
    </CardWrapper>
  );
}

export default ViewServicePage;
