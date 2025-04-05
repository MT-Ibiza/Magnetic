import { CardWrapper } from '@magnetic/ui';
import { ErrorText } from '../../components/error-text';
import { useNavigate, useParams } from 'react-router-dom';
import { useListServiceItems } from '../../hooks/useListServiceItems';
import FormPublicList from '../../components/form-public-list';
import { usePublicList } from '../../hooks/usePublicList';
import Loading from '../../components/loading';

function EditDrinkListPage() {
  const params = useParams();
  const listId = Number(params.id);
  const navigate = useNavigate();
  const type = 'drinks';

  const {
    isLoading: isLoadingList,
    isError: isErrorList,
    error: errorList,
    data: listData,
  } = usePublicList(listId);

  const {
    isLoading: isLoadingDrinks,
    isError: isErrorDrinks,
    error: errorDrinks,
    items,
  } = useListServiceItems(type);

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
            <a href="/list/drinks">Drinks Lists</a>
          </li>
          <li>New List</li>
        </ul>
      </div>
      <CardWrapper className="p-6">
        <FormPublicList
          items={items}
          type={type}
          list={{
            id: listData?.id || 0,
            name: listData?.name || '',
            itemsIds: listData ? listData.items.map((item) => item.itemId) : [],
          }}
          onSave={() => navigate(`/list/drinks`, { replace: true })}
        />
      </CardWrapper>
    </div>
  );
}

export default EditDrinkListPage;
