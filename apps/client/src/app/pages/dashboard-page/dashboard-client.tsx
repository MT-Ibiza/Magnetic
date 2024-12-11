import { StatsCard } from '@magnetic/ui';
import ServiceCardHorizontal from '../../components/service-card-horizontal';
import { useServices } from '../../hooks/useServices';
import { Link } from 'react-router-dom';

export function DashboardClientPage() {
  const { isLoading, services, error, isError } = useServices();

  const options = [
    {
      title: 'Total Guests',
      number: '10293',
      icon: 'ticket-perforated',
    },
    {
      title: 'Total Sales',
      number: '$89,000',
      icon: 'calendar',
    },
    {
      title: 'Total Comissions',
      number: '2040',
      icon: 'house',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-x-[20px]">
        {options.map((option, index) => (
          <StatsCard
            key={index}
            icon={option.icon}
            title={option.title}
            percentage={option.number}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-y-[20px]">
        <div className="flex flex-col gap-2">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="w-full"
            >
              <ServiceCardHorizontal service={service} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardClientPage;
