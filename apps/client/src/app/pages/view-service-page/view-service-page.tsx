import { AccordionSection, SectionCard } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { useAuth } from '../../hooks/useAuth';
import ListProducts from './list-products';
import NoticeBookingUnavailable from '../../components/notice-booking-unavailable';
import ListBoats from './list-boats';
import ListDrinks from './list-drinks';
import './styles.scss';
import { useState } from 'react';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const { isLoading, isError, service, error } = useService(serviceId);

  const [selectedCarService, setSelectedCarService] = useState('standard');

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
    <>
      <NoticeBookingUnavailable arrivalDate={user?.arrivalDate} />
      <div className="space-y-6">
        <SectionCard title={service.name}>
          <div
            className="text-neutral-6000 dark:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </SectionCard>
        {(service.instructions || service.termsAndConditions) && (
          <AccordionSection title="Need to Know">
            <div>
              {service.instructions && (
                <>
                  <h4 className="text-lg font-semibold">Before You Book</h4>
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
                  <h4 className="text-lg font-semibold">Cancellation Policy</h4>
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
          <>
            {service.serviceType === 'cart_rental' ? (
              <div>
                <div className="flex justify-center gap-10 w-full pb-5">
                  <div
                    className={`border border-gray-600 rounded-md py-3 px-10 cursor-pointer hover:bg-primary-100 ${
                      selectedCarService === 'standard' &&
                      'border-primary-500 bg-primary-100'
                    }`}
                    onClick={() => {
                      setSelectedCarService('standard');
                    }}
                  >
                    Standard
                  </div>
                  <div
                    className={`border border-gray-600 rounded-md py-3 px-10 cursor-pointer hover:bg-primary-100 ${
                      selectedCarService === 'premium' &&
                      'border-primary-500 bg-primary-100'
                    }`}
                    onClick={() => {
                      setSelectedCarService('premium');
                    }}
                  >
                    Premium
                  </div>
                  <div
                    className={`border border-gray-600 rounded-md py-3 px-10 cursor-pointer hover:bg-gray-50 ${
                      selectedCarService === 'luxury' &&
                      'border-primary-500 hover:bg-primary-100 bg-primary-100'
                    }`}
                    onClick={() => {
                      setSelectedCarService('luxury');
                    }}
                  >
                    Luxury
                  </div>
                </div>
                {selectedCarService === 'standard' && (
                  <div
                    dangerouslySetInnerHTML={{ __html: service.script }}
                  ></div>
                )}
                {selectedCarService === 'premium' && (
                  <div
                    dangerouslySetInnerHTML={{ __html: service.script }}
                  ></div>
                )}
                {selectedCarService === 'luxury' && (
                  <iframe
                    style={{ width: '100%', border: 'none', height: '40rem' }}
                    id="iframe_carplus_afiliado"
                    src="https://exclusiverentalcars.es/iframe-dynamic/"
                  ></iframe>
                )}
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
            )}
          </>
        ) : (
          <>
            {service.serviceType === 'drinks' && (
              <ListDrinks serviceId={serviceId} />
            )}
            {service.serviceType === 'boat_rental' && <ListBoats />}
            {!['drinks', 'boat_rental'].includes(service.serviceType) && (
              <ListProducts
                service={service}
                items={publishedItems}
                availableInPlan={availableInPlan}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ViewServicePage;
