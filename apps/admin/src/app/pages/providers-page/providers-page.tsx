import { CardWrapper, Button, Text } from '@magnetic/ui';
import ProvidersTable from '../../components/providers/providers-table';

export function ProvidersPage() {
  return (
    <CardWrapper>
      <div className="header flex justify-between mb-8">
        <div className="flex flex-col gap-1">
          <Text size="3">Providers</Text>
        </div>
        <div>
          <Button>+ Add Provider</Button>
        </div>
      </div>
      <ProvidersTable />
    </CardWrapper>
  );
}

export default ProvidersPage;
