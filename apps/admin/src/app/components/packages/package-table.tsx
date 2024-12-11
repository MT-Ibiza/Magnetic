import React from 'react';
import { useServices } from '../../hooks/useServices';
import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { usePackages } from '../../hooks/usePackages';

interface Props {}

function PackagesTable(props: Props) {
  const {} = props;
  const { isLoading, packages, error, isError } = usePackages();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((packageItem, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td>
                <Link to={`/package/${packageItem.id}`}>{packageItem.name}</Link>
              </td>
              <td>{packageItem.priceInCents}</td>
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
                      <a href={`/packages/edit/${packageItem.id}`}>Edit Package</a>
                    </li>
                    <li
                      onClick={() => {
                        // onClickRemove && onClickRemove(user);
                      }}
                    >
                      <a>Delete Package</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PackagesTable;
