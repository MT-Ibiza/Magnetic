import { CardWrapper, ServiceForm } from '@magnetic/ui';

interface User {
  id: number;
  name: string;
  email: string;
  dateCreated: string;
  type: string;
}

export function ServicePage() {

  return (
    <>
      <CardWrapper>
        <ServiceForm/>
      </CardWrapper>
    </>
  );
}

export default ServicePage;
