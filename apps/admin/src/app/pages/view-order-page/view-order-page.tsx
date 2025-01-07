import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import OrderItemsTable from '../../components/orders/order-items-table';

interface Props {}

function ViewOrderPage(props: Props) {
  const {} = props;
  const params = useParams();
  const orderId = parseInt(params.id || '');

  const { isLoading, isError, order, error } = useOrder(orderId);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (!order) {
    return <p>Order Not Found</p>;
  }

  return (
    <div className="bg-base-100 listingSection__wrap">
      <h1>{`Order #${order.id}`}</h1>
      <OrderItemsTable items={order.items} />
    </div>
  );
}

export default ViewOrderPage;
