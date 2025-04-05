import { CardWrapper } from '@magnetic/ui';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormDrinksList from '../../components/form-drinks-list';
import { useNavigate } from 'react-router-dom';
import { useListServiceItems } from '../../hooks/useListServiceItems';
import FormPublicList from '../../components/form-public-list';

function NewBoatListPage() {
  const { isLoading, isError, error, items } =
    useListServiceItems('boat_rental');
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorText text={error?.message || ''} />;

  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/list/drinks">Boats Lists</a>
          </li>
          <li>New List</li>
        </ul>
      </div>
      <CardWrapper className="p-6">
        <FormPublicList
          items={items}
          type="boat_rental"
          onSave={() => navigate(`/list/boats`, { replace: true })}
        />
      </CardWrapper>
    </div>
  );
}

export default NewBoatListPage;
