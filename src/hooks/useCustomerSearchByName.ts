import { useQuery } from '@tanstack/react-query';
import customersService from 'services/collections/customers.service';

import useDebounceState from './useDebounceState';

function useCustomerSearchByName() {
  const { input, setInput } = useDebounceState();

  const customersAction = useQuery(['customers', input], () => customersService.fetchMany({
    filters: {
      $and: [{ name: { $contains: input } }]
    }
  }), {
    enabled: !!input
  });

  return { customersAction, setInput };

}

export default useCustomerSearchByName;