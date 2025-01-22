import React from 'react';
import { useServices } from '../../hooks/useServices';
import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface Props {}

function ServicesTable(props: Props) {
  const {} = props;
  const { isLoading, services, error, isError } = useServices();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Supplier</th>
            <th>Subscription</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td>
                <Link to={`/services/${service.id}`}>{service.name}</Link>
              </td>
              <td>{service.providerId ? 'pending' : 'n/a'}</td>
              <td>{service.package.name}</td>
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
                      <a href={`/services/edit/${service.id}`}>Edit Service</a>
                    </li>
                    <li>
                      <a href={`/services/${service.id}`}>Add Item</a>
                    </li>
                    <li
                      onClick={() => {
                        // onClickRemove && onClickRemove(user);
                      }}
                    >
                      <a>Delete Service</a>
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

export default ServicesTable;
