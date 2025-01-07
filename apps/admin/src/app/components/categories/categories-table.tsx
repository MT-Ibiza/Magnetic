import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useCategories } from '../../hooks/useCategories';
import moment from 'moment';
import { Category } from '@magnetic/interfaces';

interface Props {
  onClickEdit?: (category: Category) => void;
}

export function CategoriesTable(props: Props) {
  const { onClickEdit } = props;
  const { isLoading, categories, error, isError, refetch } = useCategories();

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
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td
                className="cursor-pointer hover:underline"
                onClick={() => {
                  onClickEdit && onClickEdit(category);
                }}
              >
                {category.name}
              </td>
              <td> {moment(category.createdAt).format('DD MMM YYYY')}</td>
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
                        onClickEdit && onClickEdit(category);
                      }}
                    >
                      <a>Edit</a>
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
