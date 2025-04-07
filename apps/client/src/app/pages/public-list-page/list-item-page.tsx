import { useParams } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import { GalleryModal } from '@magnetic/ui';
import { useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import { useListItem } from '../../hooks/useListItem';
import ViewPublicBoat from './view-public-boat';

export function ListItemPage() {
  const params = useParams();
  const slug = params.slug || '';
  const itemId = Number(params.itemId);
  const { setSelectedItem } = useApp();

  const { isLoading, isError, item, error } = useListItem(slug, itemId);

  useEffect(() => {
    if (item) {
      setSelectedItem(item);
    }
  }, [item]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Something went wrong'}</div>;
  }

  return (
    <>
      <div className={`nc-ListingCarDetailPage `}>
        {item && (
          <div className="flex flex-col gap-6">
            {item.images && item.images.length > 0 && (
              <GalleryModal images={item?.images} />
            )}
            <ViewPublicBoat item={item} />
          </div>
        )}
      </div>
    </>
  );
}

export default ListItemPage;
