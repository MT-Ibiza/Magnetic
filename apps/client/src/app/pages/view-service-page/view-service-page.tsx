import {
  AccordionSection,
  Badge,
  CardWrapper,
  SectionCard,
} from '@magnetic/ui';
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
    <div>
      <NoticeBookingUnavailable arrivalDate={user?.arrivalDate} />
      <div className="space-y-6">
        <SectionCard title={service.name}>
          <div
            className="text-neutral-6000 dark:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </SectionCard>
        {(service.instructions || service.termsAndConditions) && (
          <AccordionSection title="Things to know">
            <div>
              {service.instructions && (
                <>
                  <h4 className="text-lg font-semibold">Instructions</h4>
                  <div
                    className="editor-text block mt-3 leading-relaxed text-neutral-500 dark:text-neutral-400"
                    dangerouslySetInnerHTML={{ __html: service.instructions }}
                  />
                </>
              )}

              {service.instructions && service.termsAndConditions && (
                <div className="w-14 my-[32px] border-b border-neutral-200 dark:border-neutral-700"></div>
              )}

              {service.termsAndConditions && (
                <>
                  <h4 className="text-lg font-semibold">Cancellation policy</h4>
                  <div
                    className="editor-text block mt-3 leading-relaxed text-neutral-500 dark:text-neutral-400"
                    dangerouslySetInnerHTML={{
                      __html: service.termsAndConditions,
                    }}
                  />
                </>
              )}
            </div>
          </AccordionSection>
        )}
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
      </div>
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
  );
}

export default ViewServicePage;
