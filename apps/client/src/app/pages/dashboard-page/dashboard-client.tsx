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
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import ServiceCard from '../../components/services/service-card';
import CarouselServices from '../../components/carousel-servies';

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
    .slice(0, 5);

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

  const arrivalDate2 = maxDateToBooking(userAccount.arrivalDate);
  const arrivalDate = moment(userAccount.arrivalDate);
  const departureDate = moment(userAccount.departureDate);
  const formattedDates = `${arrivalDate2.format(
    'DD MMM'
  )} - ${departureDate.format('DD MMM YYYY')}`;
  const canMakeBookings = userCanMakeBookings(userAccount.arrivalDate);

  return (
    <>
      <div className="nc-PageHome relative overflow-hidden">
        <div className="relative mb-24 lg:mb-28">
          <div
            className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative pt-10 lg:pt-16`}
            data-nc-id="SectionHero"
          >
            <div className="flex flex-col lg:flex-row lg:gap-[30px] lg:items-center">
              <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start rounded-2xl space-y-8 sm:space-y-10 xl:pr-14 lg:mr-10 xl:mr-0 border border-neutral-200 p-8">
                <h2 className="font-medium text-4xl md:text-5xl xl:text-6xl !leading-[114%]">
                  Welcome,{' '}
                  {userAccount?.firstName
                    ? userAccount.firstName.split(' ')[0]
                    : 'Guest'}{' '}
                  {userAccount?.lastName
                    ? userAccount.lastName.split(' ').slice(-1)
                    : ''}
                </h2>
                <span className="font-medium text-neutral-700 text-base md:text-lg">
                  Your concierge package:{' '}
                  <Link
                    to={`/packages/${userAccount.package?.id}`}
                    className="text-primary-700 cursor-pointer hover:underline"
                  >
                    {userAccount.package?.name}
                  </Link>
                </span>
                <ul className="space-y-4 mt-10">
                  <li className="flex items-center space-x-4">
                    <FaMapMarkerAlt className="text-neutral-700 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {userAccount.accommodation}
                    </span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <FaCalendarAlt className="text-neutral-700 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {formattedDates}
                    </span>
                  </li>
                </ul>
                {canMakeBookings ? (
                  <div className="text-[14px] leading-[18px] lg:text-[14px] lg:leading-[24px] rounded-[15px] border border-green-500 bg-green-50 text-green-700 mb-5 flex flex-col gap-3 px-4 py-4 lg:px-8 lg:py-2">
                    <Text>
                      You can make a booking up to 7 days prior to your arrival
                      at the destination.
                    </Text>
                    <Text>
                      Until Date: {arrivalDate.format('MMMM DD, YYYY')}
                    </Text>
                  </div>
                ) : (
                  <div className="text-[14px] leading-[18px] lg:text-[14px] lg:leading-[24px] rounded-[15px] border border-primary-500 text-primary-700 mb-5 flex flex-col gap-3 px-4 py-4 lg:px-8 lg:py-2 bg-primary-100">
                    The booking services has closed as the date has already
                    passed. However, feel free to contact us via WhatsApp for
                    assistance or further inquiries.
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <header className="container rounded-2xl border border-neutral-200 p-8">
                  <div className="max-w-screen-md mx-auto space-y-5">
                    <h1
                      className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                      title="Quiet ingenuity: 120,000 lunches and counting"
                    >
                      Upgrade your Stay
                    </h1>
                    <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                      Discover our concierge packages
                    </span>
                    <Button
                      href={'/packages'}
                      className="lg:text-[16px] font-medium"
                      radius="full"
                      size={2}
                    >
                      Explore
                    </Button>
                  </div>
                </header>
              </div>
            </div>
          </div>
          <div className="lg:pt-[4rem]">
            <CarouselServices
              title="Services"
              itemPerRow={5}
              services={services}
              sliderStyle="style1"
              uniqueClassName="ListingCarMapPage"
            />
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
