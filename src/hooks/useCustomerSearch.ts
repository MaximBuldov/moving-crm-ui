import { useQuery } from '@tanstack/react-query';
import customersService from 'services/collections/customers.service';

import useDebounceState from './useDebounceState';

function useCustomerSearch() {
  const { input, setInput } = useDebounceState();

  const customersAction = useQuery(['customers', input], () => customersService.fetchMany({
    filters: {
      $or: [
        { name: { $contains: input } },
        { email: { $contains: input } },
        { jobs: { id: { $eq: input } } },
        { phones: { phone: { $contains: input } } }
      ]
    }
  }), {
    enabled: !!input
  });

  return { customersAction, setInput };

}

export default useCustomerSearch;