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
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import ServiceCard from '../../components/services/service-card';
import CarouselServices from '../../components/carousel-servies';

export function DashboardClientPage() {
  const { isLoading, packages, services, error, isError, userAccount } =
    useDashboard();

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
        <div className="relative mb-24 lg:mb-20">
          <div
            className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative pt-10 lg:pt-0`}
            data-nc-id="SectionHero"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-[30px] lg:items-center h-full">
              <div className="h-full flex flex-col gap-[10px]">
                <div className="h-full flex flex-col items-start rounded-2xl space-y-8 sm:space-y-4 xl:pr-14 lg:mr-10 xl:mr-0 border border-neutral-200 p-6">
                  <h1 className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-3xl dark:text-neutral-100 max-w-4xl ">
                    Welcome,{' '}
                    {userAccount?.firstName
                      ? userAccount.firstName.split(' ')[0]
                      : 'Guest'}{' '}
                    {userAccount?.lastName
                      ? userAccount.lastName.split(' ').slice(-1)
                      : ''}
                  </h1>
                  <span className="font-semibold text-neutral-700 text-base md:text-lg">
                    Your concierge package:{' '}
                    <Link
                      to={`/packages/${userAccount.package?.id}`}
                      className="font-medium text-neutral-700 cursor-pointer hover:underline"
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
                </div>
                <div className="h-full flex flex-col items-start rounded-2xl border border-neutral-200 p-6">
                  {canMakeBookings ? (
                    <>
                      <Text>
                        Booking can be made until{' '}
                        {arrivalDate.format('MMMM DD, YYYY')}
                      </Text>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-neutral-700 dark:text-neutral-300" />
                      <span>
                        The booking services has closed as the date has already
                        passed.
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1 h-full">
                <header className="h-full flex flex-col justify-center container rounded-2xl border border-neutral-200 p-6">
                  <div className=" max-w-screen-md space-y-4">
                    <h1 className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-3xl dark:text-neutral-100 max-w-4xl ">
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
          <div className="lg:pt-[2rem]">
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
