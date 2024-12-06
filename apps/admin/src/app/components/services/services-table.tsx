import React from 'react';
import { useServices } from '../../hooks/useServices';
import Loading from '../loading';
import { ErrorText } from '../error-text';

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
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            {/* <th>Description</th> */}
            <th>Provider</th>
            <th>Package</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr className="hover">
              <th>{index + 1}</th>
              <td>{service.name}</td>
              {/* <td>{service.description}</td> */}
              <td>{service.providerId ? 'pending' : 'n/a'}</td>
              <td>{service.package.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicesTable;
