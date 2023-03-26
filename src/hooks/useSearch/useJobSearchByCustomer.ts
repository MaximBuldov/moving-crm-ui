import { useQuery } from '@tanstack/react-query';
import { useDebounceState } from 'hooks/useDebounceState';
import { QueryType } from 'models';
import { jobsService } from 'services';

export function useJobSearchByCustomer() {
  const { input, setInput } = useDebounceState();

  const jobsAction = useQuery([QueryType.JOBS, input], () => jobsService.fetchMany({
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
