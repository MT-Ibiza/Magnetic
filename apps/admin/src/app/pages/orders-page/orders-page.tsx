import { Button, CardWrapper } from '@magnetic/ui';
import { PackagesTable } from '../../components/packages/package-table';
import { OrdersTable } from '../../components/orders/orders-table';

interface Props {}

function OrdersPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Manage and view all your orders here.
          </p>
        </div>
      </div>
      <OrdersTable />
    </CardWrapper>
  );
}

export default OrdersPage;
