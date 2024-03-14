import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICrewsScedule, QueryType } from 'models';
import { crewsSceduleService } from 'services';
import { crewScheduleStore, UpdateCrewsProps } from 'stores';

export const useCrewsMutation = () => {
  const client = useQueryClient();
  const crewsMutation = useMutation({
    mutationFn: (crew: any) => {
      return crewScheduleStore.dayInfo?.id ? crewsSceduleService.updateOne({ id: crewScheduleStore.dayInfo?.id, data: { crew } }) : crewsSceduleService.createOne({ crew });
    },
    onSuccess: (crews) => {
      client.setQueryData<ICrewsScedule>([QueryType.CREWS_SCEDULE, { date: crewScheduleStore.dayInfo.date }], crews);
    }
  });

  function moveResource(data: UpdateCrewsProps) {
    crewScheduleStore.moveResource(data);
    //crewsMutation.mutate(crewScheduleStore.crewsWithIds);
  }

  function updateCrew(data: UpdateCrewsProps) {
    crewScheduleStore.moveResource(data);
    //crewsMutation.mutate(crewScheduleStore.crewsWithIds);
  }

  return { crewsMutation, moveResource, updateCrew };
};