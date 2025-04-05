import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getDrinksLists } from '../apis/api-drinks';
import { DrinksList } from '@magnetic/interfaces';
import Loading from './loading';
import { ErrorText } from './error-text';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import { Button } from '@magnetic/ui';
import { URL_FRONTED } from '../constants';

interface Props {}

function ListsTable(props: Props) {
  const {} = props;

  const {
    data: lists = [],
    isLoading,
    isError,
    error,
  } = useQuery<DrinksList[]>({
    queryKey: ['lists'],
    queryFn: async () => {
      const result = getDrinksLists();
      await new Promise((resolve) => setTimeout(resolve, 500));
      return result;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Url</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {lists.map((list, index) => (
          <tr className="hover" key={index}>
            <td>
              <Link
                className="hover:text-primary-500 hover:underline"
                to={`/lists/edit/${list.id}`}
              >
                {list.name}
              </Link>
            </td>
            <td>{`${URL_FRONTED}/${list.slug}`}</td>
            <td> {formatDate(list.createdAt)}</td>
            <td>
              <Button onClick={async () => {}}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListsTable;
