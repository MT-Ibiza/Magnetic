import { CardWrapper } from '@magnetic/ui';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useNavigate } from 'react-router-dom';
import { useListServiceItems } from '../../hooks/useListServiceItems';
import FormPublicList from '../../components/form-public-list';

function NewDrinksListPage() {
  const { isLoading, isError, error, items } = useListServiceItems('drinks');
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorText text={error?.message || ''} />;

  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/list/drinks">Drinks Lists</a>
          </li>
          <li>New List</li>
        </ul>
      </div>
      <CardWrapper className="p-6">
        <FormPublicList
          items={items}
          type="drinks"
          onSave={() => navigate(`/list/drinks`, { replace: true })}
        />
      </CardWrapper>
    </div>
  );
}

export default NewDrinksListPage;
