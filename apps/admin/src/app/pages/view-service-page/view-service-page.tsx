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

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openForm, setOpenForm] = useState('');
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
    <CardWrapper>
      <div>
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <div className="">
              <Button
                href={`/services/${service.id}/items/new`}
                variant="outline"
                size={2}
              >
                + New Item
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[15px]">
            <span className="text-lg font-semibold block">
              {service.package.name} Plan
            </span>
            <div className="flex justify-between w-full">
              <div
                className="block"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          </div>
        </div>
        <CardWrapper>
          <ItemsTable
            items={service.items}
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
        </CardWrapper>
      </div>
      <DrawerContent
        title={'Edit Service'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        {openForm === 'product' && (
          <FormProduct
            onCancel={toggleDrawer}
            serviceId={serviceId}
            item={selectedItem}
            onSave={() => {
              toggleDrawer();
            }}
          />
        )}
        {openForm === 'variant' && selectedItem && (
          <FormVariant
            onCancel={toggleDrawer}
            itemId={selectedItem.id}
            onSave={() => {
              // setSelectedVariant(undefined);
            }}
          />
        )}
      </DrawerContent>
    </CardWrapper>
  );
}

export default ViewServicePage;
