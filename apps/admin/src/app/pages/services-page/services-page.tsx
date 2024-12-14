import { CardWrapper, Button } from '@magnetic/ui';
import ServicesTable from '../../components/services/services-table';

export function ServicePage() {
  return (
    <CardWrapper className="p-6">
      <div className="header flex justify-between items-start mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Services</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Manage and view all your services here.
          </p>
        </div>
        <Button
          href={'/services/new'}
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          + Add Service
        </Button>
      </div>
      <ServicesTable />
    </CardWrapper>
  );
}

export default ServicePage;
