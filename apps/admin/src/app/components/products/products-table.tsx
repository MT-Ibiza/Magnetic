import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useMutation } from '@tanstack/react-query';
import { deleteItem } from '../../apis/api-items';
import { toast } from 'sonner';
import ConfirmAlert from '../confirm-alert';
import { useState } from 'react';
import { ApiResponse, Item } from '@magnetic/interfaces';

interface Props {}

export function ProductsTable(props: Props) {
  const {} = props;
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [showAlert, setShowAlert] = useState(false);
  const params = {
    searchText: '',
    categoryId: undefined,
    page: 1,
    itemsPerPage: 10,
  };
  const {
    isLoading,
    products,
    error,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    publishOrUnpublishItemApi,
  } = useProducts(params);

  const removeItem = useMutation<
    ApiResponse,
    Error,
    { serviceId: number; itemId: number }
  >({
    mutationFn: ({ serviceId, itemId }) => deleteItem(serviceId, itemId),
    onSuccess: () => {
      setShowAlert(false);
      toast.success(`Product removed!`);
      refetch();
    },
    onError: () => {
      setShowAlert(false);
      toast.error(`Product cannot remove!`);
      console.log('Product cannot remove');
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  const handlePublishToggle = async (
    productId: number,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    await publishOrUnpublishItemApi.mutateAsync({
      itemId: productId,
      isPublished: newStatus,
    });
    toast.success(`Product ${newStatus ? 'published' : 'unpublished'}`);

    refetch();
  };

  return (
    <>
      <div className="">
        <table className="table w-full">
          <thead>
            <tr>
              <th>N</th>
              <th>Name</th>
              <th>Service</th>
              <th>Price</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr className="hover" key={product.id}>
                <th>{index + 1}</th>
                <td>
                  <Link
                    to={`/services/${product.serviceId}/items/${product.id}/edit`}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>{product.service.name}</td>
                <td>{centsToEurosWithCurrency(product.priceInCents)}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm toggle-success"
                    checked={product.published}
                    onChange={() =>
                      handlePublishToggle(product.id, product.published)
                    }
                  />
                </td>
                <td>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <HiOutlineDotsVertical />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <a
                          href={`/services/${product.serviceId}/items/${product.id}/edit`}
                        >
                          Edit Product
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          setSelectedItem(product);
                          setShowAlert(true);
                        }}
                      >
                        <a className="text-red-500">Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasNextPage && (
          <div className="text-center">
            <Button
              className="text-center m-5 bg-primary hover:bg-primary-800"
              variant="solid"
              onClick={() => {
                fetchNextPage();
              }}
            >
              Load More Results
            </Button>
          </div>
        )}
      </div>
      <ConfirmAlert
        title={'Remove product'}
        message={
          selectedItem?.published
            ? 'This product is published, Are you sure you want to remove this product?'
            : 'Are you sure you want to remove this product?'
        }
        show={showAlert}
        onClickConfirm={async () => {
          if (selectedItem) {
            await removeItem.mutateAsync({
              serviceId: selectedItem.serviceId,
              itemId: selectedItem.id,
            });
          }
        }}
        onClickCancel={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
}
