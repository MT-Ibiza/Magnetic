import { Button, EmptyState } from '@magnetic/ui';

export function ProductsViewPage() {
  return (
    <div className="page px-2.5 py-5 lg:px-5">
      <EmptyState
        title="No products found"
        description="No products foundYour search for products did not match any products. Please try again or add a new product."
      >
        <Button>Add Product</Button>
      </EmptyState>
    </div>
  );
}

export default ProductsViewPage;
