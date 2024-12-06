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
      <CardWrapper>
        <div className="header flex justify-between mb-8">
          <div className="flex flex-col gap-1">
            <Text size="3">Providers</Text>
          </div>
          <div>
            <Button onClick={toggleDrawer}>+ Add Provider</Button>
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
