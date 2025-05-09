import React, { useEffect, useState } from 'react';
import { usePublicList } from '../../hooks/usePublicList';
import { useParams } from 'react-router-dom';
import PublicListBoats from './public-list-boats';
import { Item } from '@magnetic/interfaces';
import PublicListDrinks from './public-list-drinks';

interface Props {}

function PublicListPage(props: Props) {
  const {} = props;
  const params = useParams();
  const slug = params.slug || '';
  const { isLoading, isError, error, data } = usePublicList(slug);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (data?.items) {
      const items = data.items.map((item) => item.item);
      setItems(items);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }
  return (
    <>
      {data?.type === 'boat_rental' && (
        <PublicListBoats items={items} slug={slug} />
      )}
      {data?.type === 'drinks' && <PublicListDrinks items={items} />}
    </>
  );
}

export default PublicListPage;
