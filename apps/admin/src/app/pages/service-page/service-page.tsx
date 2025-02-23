import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { Button, CardWrapper, DrawerContent, Text } from '@magnetic/ui';
import ItemsTable from '../../components/services/items-table';
import { useState } from 'react';
import FormProduct from '../../components/services/form-product';
import { ApiResponse, Item } from '@magnetic/interfaces';
import FormVariant from '../../components/form-variant';
import './styles.scss';
import { BoatsTable } from '../../components/boats/boats-table';
import { useMutation } from '@tanstack/react-query';
import { deleteItem } from '../../apis/api-items';
import { toast } from 'sonner';
import ConfirmAlert from '../../components/confirm-alert';
import FormSortImages from '../../components/services/form-sort-images';

interface Props {}

function ServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openForm, setOpenForm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [showAlert, setShowAlert] = useState(false);
  const {
    isLoading,
    isError,
    service,
    error,
    publishOrUnpublishItemApi,
    refetch,
  } = useService(serviceId);

  const removeItem = useMutation<ApiResponse, Error, any>({
    mutationFn: (itemId: number) => {
      return deleteItem(serviceId, itemId);
    },
    onSuccess: () => {
      setShowAlert(false);
      toast.success(`Product removed!`);
      refetch();
    },
    onError: () => {
      setShowAlert(false);
      toast.error(`Product cannot remove!`);
      console.log('Product cannot remove');
    },
  });

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

  const handlePublishToggle = async (
    productId: number,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    await publishOrUnpublishItemApi.mutateAsync({
      itemId: productId,
      isPublished: newStatus,
    });
    toast.success(`Product ${newStatus ? 'published' : 'unpublished'}`);

    refetch();
  };

  return (
    <>
      <CardWrapper className="p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {service.name}
            </h2>
            <div className="gap-3 flex justify-end lg:w-auto w-full">
              <Button
                href={`/services/edit/${service.id}`}
                variant="outline"
                className="px-6 py-2 text-primary-500 border-primary-500 hover:bg-primary-50"
              >
                Edit Service
              </Button>
              {!service.script && (
                <Button href={`/services/${service.id}/items/new`}>
                  + New Product
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[15px]">
            <span className="text-lg font-semibold text-gray-700">
              {/* {service.package?.name} */}
            </span>
            <div className="text-sm text-gray-500 leading-relaxed editor-text">
              <div
                className="block"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          </div>
          {/* <div className="w-full">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="object-cover w-full"
            />
          </div> */}
          {service.script ? (
            <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
          ) : (
            <div className="mt-6">
              {service.serviceType === 'boat_rental' ? (
                <BoatsTable
                  serviceId={service.id}
                  onClickRemove={(item) => {
                    setSelectedItem(item);
                    setShowAlert(true);
                  }}
                  onClickOrderImages={(item) => {
                    setSelectedItem(item);
                    setOpenForm('images');
                    toggleDrawer();
                  }}
                />
              ) : (
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
                  onClickRemove={(item) => {
                    setSelectedItem(item);
                    setShowAlert(true);
                  }}
                  onTogglePublish={handlePublishToggle}
                />
              )}
            </div>
          )}
        </div>
      </CardWrapper>
      <DrawerContent
        title={openForm === 'product' ? 'Edit Product' : 'Edit Variant'}
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
        {openForm === 'images' && (
          <FormSortImages
            images={selectedItem?.images || []}
            onSave={toggleDrawer}
            onCancel={toggleDrawer}
          />
        )}
      </DrawerContent>
      <ConfirmAlert
        title={'Remove product'}
        message={
          selectedItem?.published
            ? 'This product is published, Are you sure you want to remove this product?'
            : 'Are you sure you want to remove this product?'
        }
        show={showAlert}
        onClickConfirm={async () => {
          const itemId = selectedItem?.id || 0;
          await removeItem.mutateAsync(itemId);
        }}
        onClickCancel={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
}

export default ServicePage;
