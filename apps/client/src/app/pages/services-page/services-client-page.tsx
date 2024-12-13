import { useServices } from '../../hooks/useServices';
import ServiceCard from '../../components/service-card';
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
    <div className="bg-base-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Explore Our Services</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Browse through our wide range of services designed to make your life easier and more efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="block"
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
