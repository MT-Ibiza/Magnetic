import { CardWrapper } from '@magnetic/ui';
import { useDrinksList } from '../../hooks/useDrinksList';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormDrinksList from '../../components/form-drinks-list';
import { useParams } from 'react-router-dom';
import { useList } from '../../hooks/useList';

function EditListItemsPage() {
  const params = useParams();
  const listId = Number(params.id);

  const {
    isLoading: isLoadingList,
    isError: isErrorList,
    error: errorList,
    data: listData,
  } = useList(listId);

  const {
    isLoading: isLoadingDrinks,
    isError: isErrorDrinks,
    error: errorDrinks,
    drinks,
  } = useDrinksList();

  const isLoading = isLoadingList || isLoadingDrinks;
  const isError = isErrorList || isErrorDrinks;
  const error = errorList || errorDrinks;

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
        <FormDrinksList
          drinks={drinks}
          list={{
            name: listData?.name || '',
            itemsIds: listData ? listData.items.map((item) => item.itemId) : [],
          }}
        />
      </CardWrapper>
    </div>
  );
}

export default EditListItemsPage;
