import { PlanCard, Text } from '@magnetic/ui';
import ServiceCardHorizontal from '../../components/services/service-card-horizontal';
import { useDashboard } from '../../hooks/useDashboard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button';

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

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-[20px]">
          <div className="bg-base-100 py-10 px-6">
            <div className="container mx-auto text-center">
              <h1 className="text-2xl lg:text-3xl font-bold">
                Welcome, {userAccount.name}
              </h1>
              <p className="mt-2">Explore your services and packages below.</p>
              {userAccount.package?.name && (
                <p className="text-base lg:text-lg font-bold text-primary-600 mt-4">
                  Package: {userAccount.package?.name}
                </p>
              )}
              <div className="mt-6 flex gap-3 justify-around">
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
                    {moment(userAccount.departureDate).format('MMMM DD, YYYY')}
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="container mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <video
                  controls
                  className="h-[350px] lg:h-[400px] w-full object-cover"
                  src={videoUrl.thumbnail}
                  poster={videoUrl.thumbnail}
                ></video>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-2 py-10 grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">
              Your Services
            </h2>
            <div className="flex flex-col gap-4">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="block"
                >
                  <ServiceCardHorizontal service={service} />
                </Link>
              ))}
              {filteredServices.length > 2 && (
                <div className="flex justify-end">
                  <Link
                    to="/services"
                    className="text-primary-600 font-semibold mt-4 hover:underline"
                  >
                    View All Services
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">
              Available Packages
            </h2>
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
      <div>
        <FloatingWhatsApp
          phoneNumber="46728482437" // Required
          accountName="Magnetic Travel" // Optional
          initialMessageByServer="Hi there! How can I assist you?" // Optional
          initialMessageByClient="Hello! I would like to chat with you" // Optional
          statusMessage="Available" // Optional
          startChatText="Start chat with us" // Optional
          tooltipText="Need help? Click to chat!" // Optional
          allowEsc={true} // Optional
        />
      </div>
    </>
  );
}

export default DashboardClientPage;
