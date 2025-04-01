import { useServices } from '../../hooks/useServices';
import ServiceCard from '../../components/services/service-card';
import { Link } from 'react-router-dom';

export function ServiceClientPage() {
  const { isLoading, services, error, isError } = useServices();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
          <p className="text-lg font-semibold text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            {error?.message || 'An unknown error occurred'}
          </p>
          <p className="text-gray-500 mt-2">
            Please try refreshing the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 lg:pb-32">
      <div className="mx-auto"> 
        <header className="text-center max-w-2xl mx-auto lg:mt-12 mb-10 lg:mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold">Services</h2>
          <span className="mt-2 md:mt-3 font-normal block text-sm sm:text-lg text-neutral-500 dark:text-neutral-400">
            Browse and book premium services to enhance your stay.
          </span>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[32px]">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              // className="block"
            >
              <ServiceCard service={service} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceClientPage;
