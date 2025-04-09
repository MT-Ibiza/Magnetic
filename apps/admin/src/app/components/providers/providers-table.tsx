import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useProviders } from '../../hooks/useProviders';
import { Provider } from '@magnetic/interfaces';
import ConfirmAlert from '../confirm-alert';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { removeProvider } from '../../apis/api-providers';

interface Props {
  onClickEdit?: (provider: Provider) => void;
  onRefetch?: (refetchFn: () => void) => void;
}

function ProvidersTable(props: Props) {
  const { onClickEdit, onRefetch } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider>();
  const { isLoading, providers, error, isError, refetch } = useProviders();
  const toggleAlert = () => {
    setShowAlert((prevState) => !prevState);
  };

  const removeSupplier = useMutation<Provider, Error, any>({
    mutationFn: (ProviderId: number) => {
      return removeProvider(ProviderId);
    },
    onSuccess: () => {
      toggleAlert();
      refetch();
    },
    onError: (error) => {
      console.log('error: ', error);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  if (onRefetch) {
    onRefetch(refetch);
  }

  return (
    <>
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
              <td>{provider.name}</td>
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
                        setSelectedProvider(provider);
                        toggleAlert();
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
      <ConfirmAlert
        title={'Remove Supplier'}
        message={`Are you sure you want to remove ${selectedProvider?.name} supplier?`}
        show={showAlert}
        onClickConfirm={async () => {
          if (selectedProvider) {
            await removeSupplier.mutateAsync(selectedProvider.id);
          }
        }}
        onClickCancel={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
}

export default ProvidersTable;
