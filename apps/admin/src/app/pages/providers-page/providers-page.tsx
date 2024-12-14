import { CardWrapper, Button, Text, DrawerContent } from '@magnetic/ui';
import ProvidersTable from '../../components/providers/providers-table';
import { useState } from 'react';
import FormProvider from '../../components/form-provider';
import { Provider } from '@magnetic/interfaces';

export function ProvidersPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<
    Provider | undefined
  >();

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <CardWrapper className="p-6 bg-base-100 shadow-lg rounded-lg">
        <div className="header flex justify-between items-start mb-6 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Providers</h2>
            <p className="text-sm text-gray-500 mt-[8px]">
              Manage and view all your providers here.
            </p>
          </div>
          <div>
            <Button
              onClick={toggleDrawer}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              + Add Provider
            </Button>
          </div>
        </div>
        <ProvidersTable
          onClickEdit={(provider) => {
            setSelectedProvider(provider);
            toggleDrawer();
          }}
        />
      </CardWrapper>
      <DrawerContent
        title="Add Provider"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormProvider onCancel={toggleDrawer} provider={selectedProvider} />
      </DrawerContent>
    </>
  );
}

export default ProvidersPage;
