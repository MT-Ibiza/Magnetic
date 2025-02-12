import { Badge, CardWrapper } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { useAuth } from '../../hooks/useAuth';
import ListProducts from './list-products';
import NoticeBookingUnavailable from '../../components/notice-booking-unavailable';
import ListBoats from './list-boats';
import './styles.scss';

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
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">{service.name}</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        <div className="leading-relaxed editor-text">
          <div
            className="text-neutral-6000 dark:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </div>
        {service.instructions && (
          <>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
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
      {/* <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">{service.name}</h2>
        <Badge size={3} color="yellow" name={service.packages[0].name} />
      </div>
      <div className="text-sm leading-relaxed editor-text">
        <div
          className="block"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
      </div>
      {service.instructions && (
        <div className="text-sm leading-relaxed editor-text mt-5">
          <h1>Instructions</h1>
          <div
            className="block mt-3"
            dangerouslySetInnerHTML={{ __html: service.instructions }}
          />
        </div>
      )} */}
      {service.script ? (
        <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
      ) : (
        <>
          {service.serviceType === 'boat_rental' ? (
            <ListBoats availableInPlan={true} service={service} />
          ) : (
            <ListProducts
              service={service}
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
    </CardWrapper>
  );
}

export default ViewServicePage;
