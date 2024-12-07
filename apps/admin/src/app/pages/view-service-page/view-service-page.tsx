import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { Link, useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import {
  Button,
  CardWrapper,
  DrawerContent,
  Input,
  Text,
  UploadImage,
} from '@magnetic/ui';
import ItemsTable from '../../components/services/items-table';
import { useState } from 'react';
import FormProduct from '../../components/services/form-product';
import { Item } from '@magnetic/interfaces';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { isLoading, isError, service, error } = useService(serviceId);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  if (!service) {
    return <Text>Service Not Found</Text>;
  }

  return (
    <>
      <div>
        <h1>{service.name}</h1>
        <span>{service.package.name}</span>
        <div
          className="editor-text"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        <div>
          <Link
            to={`/services/${service.id}/items/new`}
            className="text-red-800"
          >
            + New Item
          </Link>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              toggleDrawer();
            }}
            className="text-orange-400"
          >

          </button> */}
        </div>
        <CardWrapper>
          <ItemsTable
            items={service.items}
            onClickEdit={(item) => {
              toggleDrawer();
              setSelectedItem(item);
            }}
          />
        </CardWrapper>
      </div>
      <DrawerContent
        title={'Add Item'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormProduct
          onCancel={toggleDrawer}
          serviceId={serviceId}
          item={selectedItem}
          onSave={() => {
            toggleDrawer();
          }}
        />
      </DrawerContent>
    </>
  );
}

export default ViewServicePage;
