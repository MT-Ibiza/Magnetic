import { Select } from '@magnetic/ui';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { searchBoats } from '../../apis/api-boats';
import { Item } from '@magnetic/interfaces';

interface Props {}

function FilterBoats(props: Props) {
  const {} = props;

  const [searchParams, setSearchParams] = useState({
    boatType: undefined,
    guests: undefined,
    size: undefined,
    crew: undefined,
    priceGreaterThan: undefined,
    priceLessThan: undefined,
  });

  const {
    data: boats,
    isLoading,
    isError,
  } = useQuery<Item[]>({
    queryKey: ['boats', searchParams],
    queryFn: async () => {
      return searchBoats(searchParams);
    },
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
  return (
    <div>
      <div className="p-4">
        <h3 className="text-center pb-[30px]">Search</h3>
        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-4 gap-x-[30px]"
        >
          {/* <div className="flex flex-col">
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleSearchChange}
              className="input w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div> */}
          <div className="flex flex-col">
            <Select
              name="guests"
              value={searchParams.guests}
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
              value={searchParams.priceGreaterThan}
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
  );
}

export default FilterBoats;
