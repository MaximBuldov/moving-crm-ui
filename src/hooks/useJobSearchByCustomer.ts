import { useQuery } from '@tanstack/react-query';
import jobsService from 'services/collections/jobs.service';

import useDebounceState from './useDebounceState';

function useJobSearchByCustomer() {
  const { input, setInput } = useDebounceState();

  const jobsAction = useQuery(['jobs', input], () => jobsService.fetchMany({
    filters: {
      $or: [
        { customer: { name: { $contains: input } } },
        { customer: { email: { $contains: input } } },
        { id: { $eq: input } },
        { customer: { phones: { phone: { $contains: input } } } }
      ]
    }
  }), {
    enabled: !!input
  });

  return { jobsAction, setInput };

}

export default useJobSearchByCustomer;