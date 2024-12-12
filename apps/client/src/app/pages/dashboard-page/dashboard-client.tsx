import ServiceCardHorizontal from '../../components/service-card-horizontal';
import { useServices } from '../../hooks/useServices';
import { Link } from 'react-router-dom';

export function DashboardClientPage() {
  const { isLoading, services, error, isError } = useServices();
  const videoUrl = {
    id: 'Ao7e4iisKMs',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-base-100 listingSection__wrap">
          <h2 className="text-2xl font-semibold"> Welcome User Name</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
        <div
          className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] will-change-transform"
          title={videoUrl.title}
        >
          <video
            controls
            src={videoUrl.thumbnail}
            className="h-[350px] w-full"
            poster={videoUrl.thumbnail}
          >
            Your browser does not support the video tag.
          </video>
        </div>
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
