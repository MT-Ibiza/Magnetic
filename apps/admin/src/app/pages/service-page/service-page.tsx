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
import FormVariant from '../../components/form-variant';

interface Props {}

function ServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openForm, setOpenForm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { isLoading, isError, service, error, isSuccess } =
    useService(serviceId);
  console.log(service);

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
      <CardWrapper className="p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {service.name}
            </h2>
            <Button
              href={`/services/${service.id}/items/new`}
              variant="outline"
              className="px-6 py-2 text-primary-500 border-primary-500 hover:bg-primary-50"
            >
              + New Item
            </Button>
          </div>
          <div className="flex flex-col gap-[15px]">
            <span className="text-lg font-semibold text-gray-700">
              {service.package?.name}
            </span>
            <div className="text-sm text-gray-500 leading-relaxed">
              <div
                className="block"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          </div>
          <div className="mt-6">
            <ItemsTable
              items={service.items || []}
              onClickEdit={(item) => {
                toggleDrawer();
                setSelectedItem(item);
                setOpenForm('product');
              }}
              onClickVariant={(item) => {
                toggleDrawer();
                setSelectedItem(item);
                setOpenForm('variant');
              }}
            />
          </div>
        </div>
      </CardWrapper>
      <DrawerContent
        title={'Edit Item or Variant'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        {openForm === 'product' && (
          <FormProduct
            onCancel={toggleDrawer}
            serviceId={serviceId}
            item={selectedItem}
            onSave={toggleDrawer}
          />
        )}
        {openForm === 'variant' && selectedItem && (
          <FormVariant
            itemName={selectedItem.name}
            onCancel={toggleDrawer}
            itemId={selectedItem.id}
            onSave={toggleDrawer}
          />
        )}
      </DrawerContent>
    </>
  );
}

export default ServicePage;
