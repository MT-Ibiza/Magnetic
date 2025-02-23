import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useProducts } from '../../hooks/useProducts';
import { Button, DrawerContent, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import ImportBoatCalendarButton from './import-boat-calendar-button';
import { Item } from '@magnetic/interfaces';
import { placeholderItemImage } from '../../constants';
import { useState } from 'react';
import FormSortImages from '../services/form-sort-images';

interface Props {
  serviceId: number;
  onClickRemove?: (item: Item) => void;
}

export function BoatsTable(props: Props) {
  const { serviceId, onClickRemove } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>();

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
    refetch();
  };

  return (
    <>
      <table className="table w-full">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Published</th>
            <th>Calendar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr className="hover" key={product.id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex gap-3">
                  <img
                    className="w-[35px] bg-gray-50"
                    src={
                      product.images[0]
                        ? product.images[0].url
                        : placeholderItemImage
                    }
                  />
                  <Link
                    to={`/services/${product.serviceId}/items/${product.id}/edit`}
                  >
                    {product.name}
                  </Link>
                </div>
              </td>
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
                {product.boatAttributes ? (
                  <ImportBoatCalendarButton
                    boatId={product.boatAttributes.id}
                  />
                ) : (
                  <Text size="1">No ical</Text>
                )}
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
                        toggleDrawer();
                        setSelectedItem(product);
                      }}
                    >
                      <a className="">Order Images</a>
                    </li>
                    <li
                      onClick={() => {
                        onClickRemove && onClickRemove(product);
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
    </>
  );
}
