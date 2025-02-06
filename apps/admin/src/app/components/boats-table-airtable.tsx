import { useAirtableBoats } from '../hooks/useAirtableBoats';
import Loading from './loading';
import { ErrorText } from './error-text';
import { Button, Text } from '@magnetic/ui';
import ImportBoatButton from './import-boat-button';
import { Link } from 'react-router-dom';

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
            <th>Length (Mt)</th>
            <th>Capacity</th>
            {/* <th>Price</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boats.map((boat, index) => (
            <tr className="hover" key={index}>
              <td>{index + 1}</td>
              <td>
                <div className="flex flex-col gap-1">
                  {boat.item ? (
                    <Link
                      to={`/services/${boat.item.serviceId}/items/${boat.item.id}/edit`}
                      className="underline"
                    >
                      <Text size="1">{boat.boat}</Text>
                    </Link>
                  ) : (
                    <Text size="1">{boat.boat}</Text>
                  )}
                  <Text size="1" className="text-gray-500">
                    {boat.name}
                  </Text>
                </div>
              </td>
              <td>{boat.port}</td>
              <td>{boat.lengthInMeters} mt</td>
              <td>{boat.capacity}</td>
              {/* <td> */}
              {/* {boat.price.split('\n')} */}
              {/* <div>
                  {boat.price.split('\n').map((price, index) => (
                    <div key={index}>{price}</div>
                  ))}
                </div> */}
              {/* </td> */}
              <td>
                <div className="flex gap-2">
                  <ImportBoatButton boat={boat} />
                </div>
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
