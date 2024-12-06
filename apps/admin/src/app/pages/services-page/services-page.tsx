import { CardWrapper, Button } from '@magnetic/ui';
import ServicesTable from '../../components/services/services-table';

interface Services {
  id: number;
  name: string;
  address: string;
  date: string;
  type: string;
  status: 'Published' | 'Archived' | 'Private';
}

export function ServicePage() {
  return (
    <CardWrapper>
      <div className="header flex justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h2>Services</h2>
        </div>
        <div>
          <Button href={'/services/new'}>+ Add Service</Button>
        </div>
      </div>
      <ServicesTable />
    </CardWrapper>
  );
}

export default ServicePage;
