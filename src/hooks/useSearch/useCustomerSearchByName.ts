import { useQuery } from '@tanstack/react-query';
import { useDebounceState } from 'hooks/useDebounceState';
import { QueryType } from 'models';
import { customersService } from 'services';

export function useCustomerSearchByName() {
  const { input, setInput } = useDebounceState();

  const customersAction = useQuery({
    queryKey: [QueryType.CUSTOMERS, input],
    queryFn: () => customersService.fetchMany({
      filters: {
        $and: [{ name: { $contains: input } }]
      }
    }),
    enabled: !!input
  });

  return { customersAction, setInput };

}
