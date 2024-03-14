import { useQuery } from '@tanstack/react-query';
import { useDebounceState } from 'hooks/useDebounceState';
import { QueryType } from 'models';
import { customersService } from 'services';

export function useCustomerSearch() {
  const { input, setInput } = useDebounceState();

  const customersAction = useQuery({
    queryKey: [QueryType.CUSTOMERS, input],
    queryFn: () => customersService.fetchMany({
      filters: {
        $or: [
          { name: { $contains: input } },
          { email: { $contains: input } },
          { jobs: { id: { $eq: input } } },
          { phones: { phone: { $contains: input } } }
        ]
      }
    }),
    enabled: !!input
  });

  return { customersAction, setInput };

}
