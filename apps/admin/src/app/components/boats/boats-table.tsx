import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useMutation } from '@tanstack/react-query';
import { importCalendarEvents } from '../../apis/api-calendars';

interface Props {}

export function BoatsTable(props: Props) {
  const {} = props;
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

  const mutationSynCalendar = useMutation<any, Error, any>({
    mutationFn: (id: number) => {
      return importCalendarEvents(id);
    },
    onSuccess: () => {},
    onError: () => {},
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
    refetch();
  };

  async function importCalendar(boatId: number) {
    await mutationSynCalendar.mutateAsync(boatId);
  }

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
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
                  <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                      <a
                        href={`/services/${product.serviceId}/items/${product.id}/edit`}
                      >
                        Edit Product
                      </a>
                    </li>
                    <Button
                      onClick={() => {
                        if (product.boatAttributes) {
                          importCalendar(product.boatAttributes?.id);
                        }
                      }}
                    >
                      <a>Sync Calendar</a>
                    </Button>
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
  );
}
