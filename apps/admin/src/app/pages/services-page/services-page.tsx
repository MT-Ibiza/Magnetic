import { Badge, CardWrapper, Button, DrawerContent } from '@magnetic/ui';
import { TwMainColor } from 'libs/ui/src/lib/badge';
import { useState } from 'react';

interface Services {
  id: number;
  name: string;
  address: string;
  date: string;
  type: string;
  status: 'Published' | 'Archived' | 'Private';
}

export function ServicePage() {
  const services: Services[] = [
    {
      id: 1,
      name: 'John Doe',
      address: '979 Immanuel Ferry Suite 526',
      date: '2022-01-15',
      type: 'Admin',
      status: 'Published',
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '089 Kutch Green Apt. 448',
      date: '2022-01-15',
      type: 'Admin',
      status: 'Private',
    },
    {
      id: 3,
      name: 'Gary Barlow',
      address: '768 Destiny Lake Suite 600',
      date: '2022-01-15',
      type: 'Admin',
      status: 'Archived',
    },
  ];

  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const mapStatusToColor = (status: Services['status']): TwMainColor => {
    switch (status) {
      case 'Published':
        return 'green';
      case 'Archived':
        return 'gray';
      case 'Private':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <>
      <CardWrapper>
        <div className="header flex justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h2>Services</h2>
          </div>
          <Button
            onClick={() => {
              toggleDrawer();
            }}
          >
            New Service
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {service.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                    {service.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                    {service.address}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                    {service.date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                    {service.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <Badge
                      name={service.status}
                      color={mapStatusToColor(service.status)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DrawerContent
          title={'Add Service'}
          open={openDrawer}
          onClose={toggleDrawer}
        >
          <h1>Hi</h1>
        </DrawerContent>
      </CardWrapper>
    </>
  );
}

export default ServicePage;
