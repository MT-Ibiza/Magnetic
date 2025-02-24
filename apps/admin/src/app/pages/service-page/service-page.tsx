import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { Button, CardWrapper, DrawerContent, Text } from '@magnetic/ui';
import { BoatsTable } from '../../components/boats/boats-table';
import ItemsTable from '../../components/services/items-table';
import './styles.scss';
import FormSortCategories from '../../components/services/form-sort-categories';
import { useState } from 'react';
import FormSortItems from '../../components/services/form-sort-items';

interface Props {}

function ServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const { isLoading, isError, service, error, refetch } = useService(serviceId);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openForm, setOpenForm] = useState<string>();
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
          <div className="flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {service.name}
            </h2>
            <div className="gap-3 flex justify-end lg:w-auto w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenForm('products');
                  toggleDrawer();
                }}
              >
                Sort Products
              </Button>
              {service.categories.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpenForm('categories');
                    toggleDrawer();
                  }}
                >
                  Sort Categories
                </Button>
              )}
              <Button href={`/services/edit/${service.id}`} variant="outline">
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
          {service.script ? (
            <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
          ) : (
            <div className="mt-6">
              {service.serviceType === 'boat_rental' ? (
                <BoatsTable serviceId={service.id} />
              ) : (
                <ItemsTable serviceId={service.id} />
              )}
            </div>
          )}
        </div>
      </CardWrapper>
      <DrawerContent
        title="Sort Categories"
        open={openDrawer}
        onClose={toggleDrawer}
        width={openForm === 'products' ? '50rem' : undefined}
      >
        {openForm === 'categories' && (
          <FormSortCategories
            categories={service.categories}
            serviceId={service.id}
            onSave={() => {
              toggleDrawer();
              refetch();
            }}
            onCancel={toggleDrawer}
          />
        )}
        {openForm === 'products' && (
          <FormSortItems
            items={service.items || []}
            serviceId={service.id}
            onSave={() => {
              toggleDrawer();
              refetch();
            }}
            onCancel={toggleDrawer}
          />
        )}
      </DrawerContent>
    </>
  );
}

export default ServicePage;
