import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import PackagesForm from '../../components/packages/form-packages';
import { usePackage } from '../../hooks/usePackage';

interface Props {}

function EditPackagePage(props: Props) {
  const {} = props;
  const params = useParams();
  const packageId = parseInt(params.id || '');

  const { isLoading, isError, plan, error } = usePackage(packageId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  console.log(plan)

  return (
    <div>
      <PackagesForm packageData={plan} />
    </div>
  );
}

export default EditPackagePage;
