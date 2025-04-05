import { CardWrapper } from '@magnetic/ui';
import { useDrinksList } from '../../hooks/useDrinksList';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormDrinksList from '../../components/form-drinks-list';
import { useNavigate, useParams } from 'react-router-dom';

function EditListItemsPage() {
  const params = useParams();
  const listId = Number(params.listId);
  const itemId = Number(params.itemId);
  const navigate = useNavigate();

  const { isLoading, isError, error, drinks } = useDrinksList();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorText text={error?.message || ''} />;

  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/drinks-list">Drinks Lists</a>
          </li>
          <li>New List</li>
        </ul>
      </div>
      <CardWrapper className="p-6">
        <FormDrinksList drinks={drinks} />
      </CardWrapper>
    </div>
  );
}

export default EditListItemsPage;
