import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Item } from '@magnetic/interfaces';
import { priceCentsToDollars } from '@magnetic/utils';
import { Link } from 'react-router-dom';

interface Props {
  items: Item[];
  onClickEdit?: (item: Item) => void;
}

function ItemsTable(props: Props) {
  const { items, onClickEdit } = props;
  // const { isLoading, services, error, isError } = useServices();

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return <ErrorText text={error?.message || ''} />;
  // }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>N</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr className="hover">
            <th>{index + 1}</th>
            <td>
              <Link to={`/services/${item.serviceId}/items/${item.id}/edit`}>
                {item.name}
              </Link>
            </td>
            <td>{priceCentsToDollars(item.priceInCents)}</td>
            <td>{item.description}</td>
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
                      onClickEdit && onClickEdit(item);
                    }}
                  >
                    <a>Edit</a>
                  </li>

                  <li
                    onClick={() => {
                      // onClickRemove && onClickRemove(user);
                    }}
                  >
                    <a>Delete</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemsTable;
