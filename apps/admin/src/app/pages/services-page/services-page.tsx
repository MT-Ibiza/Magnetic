import { CardWrapper, Button, DrawerContent } from '@magnetic/ui';
import ServicesTable from '../../components/services/services-table';
import { useState } from 'react';
import FormSortServices from '../../components/services/form-sort-services';
import { FaSortAmountUpAlt } from 'react-icons/fa';

export function ServicesPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <CardWrapper className="p-6">
        <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Services</h2>
            <p className="text-sm text-gray-500 mt-[8px]">
              Manage and view all your services here.
            </p>
          </div>
          <div className="flex gap-3 justify-end lg:w-auto w-full">
            <Button variant="outline" onClick={toggleDrawer}>
              <FaSortAmountUpAlt /> Sort Services
            </Button>
            <Button
              href={'/services/new'}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              + Add Service
            </Button>
          </div>
        </div>
        <ServicesTable />
      </CardWrapper>
      <DrawerContent
        title="Sort Services"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormSortServices
          onSave={() => {
            toggleDrawer();
          }}
          onCancel={toggleDrawer}
        />
      </DrawerContent>
    </>
  );
}

export default ServicesPage;
