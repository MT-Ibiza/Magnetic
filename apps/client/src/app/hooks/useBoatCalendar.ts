import { BoatAvailability } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { searchAvailabilityBoat } from '../apis/api-boats';

export const useBoatCalendar = (filters: {
  from: string;
  to: string;
  boatId: string;
}) => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    BoatAvailability[]
  >({
    queryKey: [`boat-${filters.boatId}-calendar`],
    queryFn: async () => {
      return searchAvailabilityBoat(filters);
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    dates: data || [],
    refetch,
    error,
  };
};
