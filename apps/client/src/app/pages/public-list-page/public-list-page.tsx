import React from 'react';
import { usePublicList } from '../../hooks/usePublicList';
import { useParams } from 'react-router-dom';

interface Props {}

function PublicListPage(props: Props) {
  const {} = props;
  const params = useParams();
  const slug = params.slug || '';
  const { isLoading, isError, error, data } = usePublicList(slug);

  return <div></div>;
}

export default PublicListPage;
