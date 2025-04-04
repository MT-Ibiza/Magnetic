import ListDrinks from '../view-service-page/list-drinks';
import { useDrinksServices } from '../../hooks/useDrinks';

function DrinksListPage() {
  const { isLoading, isError, data, error } = useDrinksServices();
  const sortedCategories = data?.categories
    ? [...data.categories].sort((a, b) => a.position - b.position)
    : [];

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  return (
    <div className="container pt-10 lg:pt-4 pb-10">
      {data && <ListDrinks serviceId={data.id} categories={sortedCategories} />}
    </div>
  );
}

export default DrinksListPage;
