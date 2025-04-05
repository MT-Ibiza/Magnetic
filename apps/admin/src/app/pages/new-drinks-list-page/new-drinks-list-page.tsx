import { CardWrapper } from '@magnetic/ui';
import { useDrinksList } from '../../hooks/useDrinksList';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormDrinksList from '../../components/form-drinks-list';
import { useNavigate } from 'react-router-dom';

function NewDrinksListPage() {
  const { isLoading, isError, error, drinks } = useDrinksList();
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
        <FormDrinksList
          drinks={drinks}
          onSave={() => navigate(`/list/drinks`, { replace: true })}
        />
      </CardWrapper>
    </div>
  );
}

export default NewDrinksListPage;
