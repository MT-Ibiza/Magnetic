import React from 'react';
import { useAirtableBoats } from '../hooks/useAirtableBoats';
import Loading from './loading';
import { ErrorText } from './error-text';
import { Button } from '@magnetic/ui';

interface Props {}

function BoatsTableAirtable(props: Props) {
  const {} = props;
  const { isLoading, isError, boats, error, fetchNextPage, hasNextPage } =
    useAirtableBoats();

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
            <th>#</th>
            <th>Name</th>
            <th>Port</th>
            <th>Length (F)</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boats.map((boat, index) => (
            <tr className="hover" key={index}>
              <td>{index + 1}</td>
              <td>{boat.name}</td>
              <td>{boat.port}</td>
              <td>{boat.length} ft</td>
              <td>{boat.capacity}</td>
              <td>
                {boat.price.split('\n')}
                {/* <div>
                  {boat.price.split('\n').map((price, index) => (
                    <div key={index}>{price}</div>
                  ))}
                </div> */}
              </td>
              <td>
                <Button variant="outline">Import</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasNextPage && (
        <div className="text-center mt-3">
          <Button
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

export default BoatsTableAirtable;
