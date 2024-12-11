import { useServices } from '../../hooks/useServices';
import ServiceCard from '../../components/service-card';
import { Link } from 'react-router-dom';

export function ServiceClientPage() {
  const { isLoading, services, error, isError } = useServices();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error?.message || 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-8">Our Services</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {services.map((service) => (
          <Link key={service.id} to={`/services/${service.id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <ServiceCard service={service} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServiceClientPage;
