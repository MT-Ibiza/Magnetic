import { AccordionSection, Badge, SectionCard } from '@magnetic/ui';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { useAuth } from '../../hooks/useAuth';
import ListProducts from './list-products';
import NoticeBookingUnavailable from '../../components/notice-booking-unavailable';
import ListBoats from './list-boats';
import ListDrinks from './list-drinks';
import './styles.scss';
import { useState } from 'react';
import { useServiceBoats } from '../../hooks/useServiceBoats';
import { useServiceDrinks } from '../../hooks/useServiceDrinks';

interface Props {
  guestMode?: boolean;
  serviceType?: string;
}

function ViewServicePage(props: Props) {
  const { guestMode, serviceType } = props;

  const hooks = {
    drinks: useServiceDrinks,
    boats: useServiceBoats,
  };

  const hook = hooks[serviceType as 'drinks'];

  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const { isLoading, isError, service, error } =
    guestMode && serviceType
      ? hook
        ? hook()
        : useService(serviceId)
      : useService(serviceId);
  const sortedCategories = service?.categories
    ? [...service.categories].sort((a, b) => a.position - b.position)
    : [];

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
      {!guestMode && (
        <NoticeBookingUnavailable arrivalDate={user?.arrivalDate} />
      )}
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
        {service.serviceType === 'food' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.samos-deli.com/online-shop/"
              target="_blank"
              className="cursor-pointer font-semibold text-white"
            >
              <div
                className={`flex-shrink-0 relative w-full rounded-xl overflow-hidden group`}
              >
                <img
                  className="rounded-[10px] w-full"
                  src={'/images/food-card.jpg'}
                />
                <div className={`cursor-pointer relative`}>
                  <div className="rounded-[10px] flex items-center bg-primary-700 hover:bg-primary-800 h-[30px] px-[30px] absolute z-10 bottom-[10px] right-[10px]">
                    <label className="cursor-pointer text-white">
                      Visit Shop
                    </label>
                  </div>
                </div>
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
              </div>
            </a>
          </div>
        )}
        {service.script ? (
          <>
            {service.serviceType === 'cart_rental' ? (
              <div>
                <div className="grid grid-cols-2 gap-[15px] w-full pb-5">
                  <div
                    className={`cursor-pointer relative ${
                      selectedCarService === 'standard'
                        ? 'opacity-100'
                        : 'opacity-50'
                    }`}
                    onClick={() => {
                      setSelectedCarService('standard');
                    }}
                  >
                    <img
                      className="rounded-[10px] w-full"
                      src={'/images/standard-rental-car.jpg'}
                    />
                    <div className="rounded-[10px] flex items-center bg-primary-700 h-[30px] px-[30px] absolute z-10 bottom-[10px] right-[10px]">
                      <label className="cursor-pointer font-semibold text-white">
                        Standard
                      </label>
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer relative ${
                      selectedCarService === 'premium'
                        ? 'opacity-100'
                        : 'opacity-50'
                    }`}
                    onClick={() => {
                      setSelectedCarService('premium');
                    }}
                  >
                    <img
                      className="rounded-[10px]"
                      src={'/images/premium-rental-car.jpg'}
                    />
                    <div className="rounded-[10px] flex items-center bg-primary-700 h-[30px] px-[30px] absolute z-10 bottom-[10px] right-[10px]">
                      <label className="cursor-pointer font-semibold text-white">
                        Premium
                      </label>
                    </div>
                  </div>
                </div>
                {selectedCarService === 'standard' && (
                  <iframe
                    // scrolling="auto"
                    // scrolling="no"
                    style={{
                      overflow: 'auto',
                      width: '100%',
                      border: 'none',
                      height: '50rem',
                    }}
                    src="https://classrentacar.es/afiliados/211/?lang=es"
                  ></iframe>
                )}
                {selectedCarService === 'premium' && (
                  <div
                    dangerouslySetInnerHTML={{ __html: service.script }}
                  ></div>
                )}
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
            )}
          </>
        ) : (
          <>
            {service.serviceType === 'drinks' && (
              <ListDrinks
                serviceId={serviceId}
                categories={sortedCategories}
                guestMode={guestMode}
              />
            )}
            {service.serviceType === 'boat_rental' && (
              <ListBoats guestMode={guestMode} />
            )}
            {!['drinks', 'boat_rental'].includes(service.serviceType) && (
              <ListProducts
                service={service}
                items={publishedItems}
                availableInPlan={availableInPlan}
                guestMode={guestMode}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ViewServicePage;
