import {
  BgGlassmorphism,
  Button,
  Card3Small,
  PlanCard,
  Text,
} from '@magnetic/ui';
import ServiceCardHorizontal from '../../components/services/service-card-horizontal';
import { useDashboard } from '../../hooks/useDashboard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button';
import { maxDateToBooking, userCanMakeBookings } from '../../utils';

export function DashboardClientPage() {
  const { isLoading, packages, services, error, isError, userAccount } =
    useDashboard();

  const filteredPackages = packages.filter(
    (item) => item.id !== userAccount.package?.id
  );

  const filteredServices = services
    .filter((service) =>
      service.packages.some((pkg) => pkg.id === userAccount.package?.id)
    )
    .slice(0, 3);

  const videoUrl = {
    id: 'Ao7e4iisKMs',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <h1>Please try again</h1>;
  }

  const arrivalDate = maxDateToBooking(userAccount.arrivalDate);
  const canMakeBookings = userCanMakeBookings(userAccount.arrivalDate);

  return (
    <>
      <div className="bg-[#ffffff] nc-PageHome relative overflow-hidden">
        <div className="container relative space-y-24 mb-24 lg:space-y-14 lg:mb-28">
          <div
            className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative pt-10 lg:pt-16`}
            data-nc-id="SectionHero"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 xl:pr-14 lg:mr-10 xl:mr-0">
                <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%]">
                  Welcome,{' '}
                  {userAccount?.firstName
                    ? userAccount.firstName.split(' ')[0]
                    : 'Guest'}{' '}
                  {userAccount?.lastName
                    ? userAccount.lastName.split(' ').slice(-1)
                    : ''}
                </h2>
                <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                  Explore your services and packages below.
                </span>
                {/* {userAccount.package?.name && (
                <p className="w-full text-base text-center lg:text-lg font-bold text-primary-600">
                  Package: {userAccount.package?.name}
                </p>
                )} */}
                <div className="w-full border-b border-neutral-300 dark:border-neutral-700"></div>
                <div className="mt-6 flex gap-10 justify-around">
                  <div className="text-sm lg:text-base">
                    <Text size="1" className="text-gray-500">
                      Accommodation
                    </Text>
                    <Text>{userAccount.accommodation}</Text>
                  </div>
                  <div className="text-sm lg:text-base">
                    <Text size="1" className="text-gray-500">
                      Arrival Date
                    </Text>
                    <Text>
                      {moment(userAccount.arrivalDate).format('MMMM DD, YYYY')}
                    </Text>
                  </div>
                  <div className="text-sm lg:text-base">
                    <Text size="1" className="text-gray-500">
                      Departure Date
                    </Text>
                    <Text>
                      {moment(userAccount.departureDate).format(
                        'MMMM DD, YYYY'
                      )}
                    </Text>
                  </div>
                </div>
                <div className="text-[14px] leading-[18px] lg:text-[14px] lg:leading-[24px] rounded-[15px] border border-primary-500 bg-primary-50 text-primary-700 mb-5 flex flex-col gap-3 px-4 py-4 lg:px-8 lg:py-2 bg-red-100">
                  The booking services has closed as the date has already
                  passed. However, feel free to contact us via WhatsApp for
                  assistance or further inquiries.
                </div>
              </div>
              <div className="flex-grow">
                <div className="">
                  <div className="rounded-3xl overflow-hidden shadow-lg">
                    <video
                      controls
                      className="h-[350px] lg:h-[480px] w-full object-cover"
                      src={videoUrl.thumbnail}
                      poster={videoUrl.thumbnail}
                    ></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 xl:pr-14 lg:mr-10 xl:mr-0">
                <div
                  className={`nc-WidgetPosts w-full rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-800`}
                  data-nc-id="WidgetPosts"
                >
                  <div
                    className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700`}
                    data-nc-id="WidgetHeading1"
                  >
                    <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow">
                      Services
                    </h2>
                    <Link
                      className="flex-shrink-0 block text-primary-700 dark:text-primary-500 font-semibold text-sm hover:underline"
                      to="/services"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                    {filteredServices.map((service) => (
                      <Card3Small
                        className="w-full p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        service={service}
                        href={`/services/${service.id}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredPackages.map((item, index) => (
                    <PlanCard
                      key={index}
                      maxFeatures={3}
                      seeMoreLink={`/packages/${item.id}`}
                      title={item.name}
                      price={item.priceInCents}
                      features={item.features}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FloatingWhatsApp
          phoneNumber="46728482437"
          accountName="Magnetic Travel"
          initialMessageByServer="Hi there! How can I assist you?"
          initialMessageByClient="Hello! I would like to chat with you"
          statusMessage="Available"
          startChatText="Start chat with us"
          tooltipText="Need help? Click to chat!"
          allowEsc={true}
        />
      </div>
    </>
  );
}

export default DashboardClientPage;
