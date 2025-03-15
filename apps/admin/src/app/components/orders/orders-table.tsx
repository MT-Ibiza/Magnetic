import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { removePackage } from '../../apis/api-packages';
import { useOrders } from '../../hooks/useOrders';
import moment from 'moment';
import { centsToEurosWithCurrency } from '@magnetic/utils';

interface Props {}

export function OrdersTable(props: Props) {
  const {} = props;
  const { isLoading, orders, ordersOptions, error, isError, refetch } =
    useOrders();

  const mutation = useMutation<any, Error, any>({
    mutationFn: (packageId) => {
      return removePackage(packageId);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  const handleDelete = (id: number) => {
    toast.promise(mutation.mutateAsync(id), {
      loading: 'Deleting..',
      success: () => {
        refetch();
        return 'Package removed!';
      },
      error: (data) => data.message,
    });
  };

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>N</th>
            <th>Client</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr className="hover" key={index}>
              <td>
                <Link
                  className="hover:text-primary-500 hover:underline"
                  to={`/orders/${order.id}`}
                >
                  {ordersOptions[index]?.label || `Order #${order.id}`}
                </Link>
              </td>
              <td>{order.user?.name}</td>
              <td>{centsToEurosWithCurrency(order.totalWithVatInCents)}</td>
              <td> {moment(order.createdAt).format('DD MMM YYYY')}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
