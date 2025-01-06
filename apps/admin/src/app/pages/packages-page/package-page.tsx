import { Button, CardWrapper } from '@magnetic/ui';
import { PackagesTable } from '../../components/packages/package-table';

interface Props {}

function PackagesPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Packages</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Manage and view all your packages here.
          </p>
        </div>
        <div className="flex justify-end lg:w-auto w-full">
          <Button
            href={'/packages/new'}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            + Add Package
          </Button>
        </div>
      </div>
      <PackagesTable />
    </CardWrapper>
  );
}

export default PackagesPage;
