import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Item, ItemWithCount } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Props {
  items: ItemWithCount[];
  onClickEdit?: (item: Item) => void;
  onClickVariant?: (item: Item) => void;
}

function ItemsTable(props: Props) {
  const { items, onClickEdit, onClickVariant } = props;
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
          <th>Category</th>
          <th>Variants</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr className="hover" key={index}>
            <th>{index + 1}</th>
            <td>
              <Link to={`/services/${item.serviceId}/items/${item.id}/edit`}>
                {item.name}
              </Link>
            </td>
            <td>
              <Text.TextNumeric>
                {centsToEurosWithCurrency(item.priceInCents)}
              </Text.TextNumeric>
            </td>
            <td>{item.category?.name || 'none'}</td>
            <td>{item._count?.variants || '0'}</td>
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
                      onClickVariant && onClickVariant(item);
                    }}
                  >
                    <a>New Variant</a>
                  </li>
                  <li
                    onClick={() => {
                      onClickEdit && onClickEdit(item);
                    }}
                  >
                    <a>Edit Service</a>
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
