import { Button, CardWrapper } from '@magnetic/ui';
import PackagesTable from '../../components/packages/package-table';

interface Props {}

function PackagesPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper>
      <div className="header flex justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h2>Packages</h2>
        </div>
        <div>
          <Button href={'/packages/new'}>+ Add Packages</Button>
        </div>
      </div>
      <PackagesTable/>
    </CardWrapper>
  );
}

export default PackagesPage;
