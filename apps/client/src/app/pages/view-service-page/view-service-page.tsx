import { Badge, Button, CardWrapper, Select, Text } from '@magnetic/ui';
import { Link, useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import ItemCardCounter from '../../components/items/item-card-counter';
import ItemBoatCard from '../../components/items/item-boat-card';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const { isLoading, isError, service, error } = useService(serviceId);

  const [searchParams, setSearchParams] = useState({
    date: '',
    capacity: 0,
    size: 0,
    budget: 0,
  });

  const capacityOptions = [
    { value: '', label: 'Select Capacity' },
    { value: '1', label: '1 person' },
    { value: '2', label: '2 persons' },
    { value: '4', label: '3-4 persons' },
    { value: '6', label: '5-6 persons' },
    { value: '10', label: '7-10 persons' },
    { value: '15', label: '10+ persons' },
  ];

  const sizeOptions = [
    { value: '', label: 'Select Size' },
    { value: '500', label: '500 cm' },
    { value: '1000', label: '1000 cm' },
    { value: '1500', label: '1500 cm' },
    { value: '2000', label: '2000 cm' },
    { value: '2500', label: '2500+ cm' },
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget' },
    { value: '500', label: 'Up to $500' },
    { value: '1000', label: '$500 - $1,000' },
    { value: '2000', label: '$1,000 - $2,000' },
    { value: '5000', label: '$2,000 - $5,000' },
    { value: '10000', label: '$5,000+' },
  ];

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (!service) {
    return <p>Service Not Found</p>;
  }

  const publishedItems = service.items.filter((item) => item.published);

  const filteredItems = publishedItems.filter((item) => {
    const boatAttributes = item.boatAttributes;
    const isBoatAttributesValid =
      boatAttributes &&
      boatAttributes.guests !== undefined &&
      boatAttributes.sizeInCentimeters !== undefined;
    return (
      (searchParams.capacity
        ? isBoatAttributesValid
          ? boatAttributes.guests >= searchParams.capacity
          : false
        : true) &&
      (searchParams.size
        ? isBoatAttributesValid
          ? boatAttributes.sizeInCentimeters >= searchParams.size
          : false
        : true) &&
      (searchParams.budget
        ? item.priceInCents
          ? item.priceInCents <= searchParams.budget
          : false
        : true)
    );
  });

  const packageIds = service.packages.map((p) => p.id);

  return (
    <CardWrapper>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl lg:text-2xl font-semibold">{service.name}</h1>
          <Badge size={3} color="yellow" name={service.packages[0].name} />
        </div>
        <div
          className="lg:text-[16px] text-[14px] editor-text"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        {service.script ? (
          <div dangerouslySetInnerHTML={{ __html: service.script }}></div>
        ) : (
          <>
            {service.serviceType === 'boat_rental' && (
              <div>
                <div className="p-4">
                  <h3 className="text-center pb-[30px]">Search</h3>
                  <form
                    onSubmit={handleSearchSubmit}
                    className="grid grid-cols-4 gap-x-[30px]"
                  >
                    <div className="flex flex-col">
                      <input
                        type="date"
                        name="date"
                        value={searchParams.date}
                        onChange={handleSearchChange}
                        className="input w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Select
                        name="capacity"
                        value={searchParams.capacity}
                        onChange={handleSearchChange}
                        className="w-[150px]"
                      >
                        {capacityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      <Select
                        name="size"
                        value={searchParams.size}
                        onChange={handleSearchChange}
                        className="w-[150px]"
                      >
                        {sizeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      <Select
                        name="budget"
                        value={searchParams.budget}
                        onChange={handleSearchChange}
                        className="w-[150px]"
                      >
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </form>
                </div>
                <hr className="mt-4 mb-8 border-t border-gray-300" />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map((item, index) => (
                <div key={index}>
                  {service.serviceType === 'boat_rental' ? (
                    <ItemBoatCard item={item} />
                  ) : (
                    <ItemCardCounter
                      item={item}
                      availableInPlan={
                        user?.packageId
                          ? packageIds.includes(user.packageId)
                          : false
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-end pt-[20px]">
          <Link to="/checkout">
            <Button className="py-[8px] text-[16px] w-full">
              Checkout Now
            </Button>
          </Link>
        </div>
      </div>
    </CardWrapper>
  );
}

export default ViewServicePage;
