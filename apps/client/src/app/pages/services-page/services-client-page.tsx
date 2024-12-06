import { useServices } from '../../hooks/useServices';
import ServiceCard from '../../components/service-card';
import { Link } from 'react-router-dom';

export function ServiceClientPage() {
  const { isLoading, services, error, isError } = useServices();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  return (
    <div>
      <h1>Services</h1>
      <div className="flex flex-wrap gap-5 mt-5">
        {services.map((service, index) => (
          <Link to={`/services/${service.id}`}>
            <ServiceCard key={index} service={service} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServiceClientPage;
