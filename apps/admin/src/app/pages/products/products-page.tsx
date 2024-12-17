import { Button, CardWrapper } from '@magnetic/ui';
import { ProductsTable } from '../../components/products/products-table';

interface Props {}

function ProductsPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex justify-between items-start mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Manage and view all your products here.
          </p>
        </div>
      </div>
      <ProductsTable />
    </CardWrapper>
  );
}

export default ProductsPage;
