import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useProviders } from '../../hooks/useProviders';
import { Provider } from '@magnetic/interfaces';

interface Props {
  onClickEdit?: (provider: Provider) => void;
}

function ProvidersTable(props: Props) {
  const { onClickEdit } = props;
  const { isLoading, providers, error, isError } = useProviders();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="custom-overflow">
      <table className="table w-full">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td>
                <Link to={`/services/${provider.id}`}>{provider.name}</Link>
              </td>
              <td>{provider.email}</td>
              <td>{provider.website}</td>
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
                        onClickEdit && onClickEdit(provider);
                      }}
                    >
                      <a>Edit</a>
                    </li>
                    <li
                      onClick={() => {
                        // onClickRemove && onClickRemove(user);
                      }}
                    >
                      <a>Remove</a>
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

export default ProvidersTable;
