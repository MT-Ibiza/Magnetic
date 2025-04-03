import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useOrders } from '../../hooks/useOrders';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { removeOrder } from '../../apis/api-orders';
import moment from 'moment';
import { Button } from '@magnetic/ui';

interface Props {}

export function OrdersTable(props: Props) {
  const {} = props;
  const { isLoading, orders, ordersOptions, error, isError, refetch } =
    useOrders();

  const mutation = useMutation<any, Error, any>({
    mutationFn: (orderId) => {
      return removeOrder(orderId);
    },
    onSuccess: () => {
      refetch();
      toast.success(`Order removed!`);
    },
    onError: () => {
      toast.success(`Order couldn't be removed!`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

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
            <th>Actions</th>
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
              <td>{centsToEurosWithCurrency(order.totalInCents)}</td>
              <td> {moment(order.createdAt).format('DD MMM YYYY')}</td>
              <td>{order.status}</td>
              <td>
                <Button
                  onClick={async () => {
                    await mutation.mutateAsync(order.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
