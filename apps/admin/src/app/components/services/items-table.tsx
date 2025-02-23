import { HiOutlineDotsVertical } from 'react-icons/hi';
import { ApiResponse, Item, ItemWithCount } from '@magnetic/interfaces';
import { Button, DrawerContent, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { placeholderItemImage } from '../../constants';
import { useProducts } from '../../hooks/useProducts';
import { ErrorText } from '../error-text';
import Loading from '../loading';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { deleteItem } from '../../apis/api-items';
import ConfirmAlert from '../confirm-alert';
import FormSortImages from './form-sort-images';

interface Props {
  serviceId: number;
}

function ItemsTable(props: Props) {
  const { serviceId } = props;
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const params = {
    serviceId: serviceId,
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

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const removeItem = useMutation<ApiResponse, Error, any>({
    mutationFn: (itemId: number) => {
      return deleteItem(serviceId, itemId);
    },
    onSuccess: () => {
      setShowAlert(false);
      toast.success(`Product removed!`);
      refetch();
    },
    onError: () => {
      setShowAlert(false);
      toast.error(`Product cannot remove!`);
    },
  });

  const handlePublishToggle = async (
    productId: number,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    await publishOrUnpublishItemApi.mutateAsync({
      itemId: productId,
      isPublished: newStatus,
    });
    toast.success('Product updated!');
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Variants</th>
            <th>Publish</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td>
                <div className="flex gap-3">
                  <img
                    className="w-[35px] bg-gray-50"
                    src={
                      item.images[0] ? item.images[0].url : placeholderItemImage
                    }
                  />
                  <Link
                    to={`/services/${item.serviceId}/items/${item.id}/edit`}
                  >
                    {item.name}
                  </Link>
                </div>
              </td>
              <td>
                <Text.TextNumeric>
                  {centsToEurosWithCurrency(item.priceInCents)}
                </Text.TextNumeric>
              </td>
              <td className="">{item.category?.name || 'none'}</td>
              <td>{item.variants.length || '0'}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-success"
                  checked={item.published}
                  onChange={() => handlePublishToggle(item.id, item.published)}
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
                    <li
                      onClick={() => {
                        // onClickVariant && onClickVariant(item);
                      }}
                    >
                      <a>New Variant</a>
                    </li>
                    <li>
                      <a
                        href={`/services/${item.serviceId}/items/${item.id}/edit`}
                      >
                        Edit Product
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        setSelectedItem(item);
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
            Load More Products
          </Button>
        </div>
      )}

      <DrawerContent
        title="Sort Images"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        {selectedItem && (
          <FormSortImages
            itemId={selectedItem.id}
            images={selectedItem.images}
            onSave={() => {
              toggleDrawer();
              refetch();
            }}
            onCancel={toggleDrawer}
          />
        )}
      </DrawerContent>

      <ConfirmAlert
        title="Remove Product"
        message={
          selectedItem?.published
            ? 'This product is published, Are you sure you want to remove this product?'
            : 'Are you sure you want to remove this product?'
        }
        show={showAlert}
        onClickConfirm={async () => {
          const itemId = selectedItem?.id || 0;
          await removeItem.mutateAsync(itemId);
        }}
        onClickCancel={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
}

export default ItemsTable;
