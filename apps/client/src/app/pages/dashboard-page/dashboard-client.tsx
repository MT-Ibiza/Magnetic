import { PlanCard } from '@magnetic/ui';
import ServiceCardHorizontal from '../../components/services/service-card-horizontal';
import { useDashboard } from '../../hooks/useDashboard';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function DashboardClientPage() {
  const { isLoading, packages, services, error, isError } = useDashboard();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const filteredPackages = packages.filter(
    (item) => item.id !== user?.package?.id
  );

  const filteredServices = services.filter(
    (service) => service.packageId === user?.package?.id
  );

  const videoUrl = {
    id: 'Ao7e4iisKMs',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  };

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      <div className="bg-base-100 py-10 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome, {user?.name}
          </h1>
          <p className="mt-2">
            Explore your services and packages below.
          </p>
          {user?.package?.name && (
            <p className="text-base lg:text-lg font-bold text-primary-600 mt-4">
              {user?.package?.name}
            </p>
          )}
        </div>
      </div>
      <div className="bg-gray-100 py-8 lg:py-10">
        <div className="container mx-auto px-0 lg:px-6">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <video
              controls
              className="h-[350px] lg:h-[1000px] lg:h-[500px] w-full  object-cover"
              src={videoUrl.thumbnail}
              poster={videoUrl.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-[16px] text-[14px] text-gray-500 mt-2 text-center">{videoUrl.title}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
  );
}

export default DashboardClientPage;
