import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { QueryType, IAccountTypes, IResources } from 'models';
import { trucksService, usersService } from 'services';
import { crewScheduleStore } from 'stores';
import { observer } from 'mobx-react-lite';

import { ResourcesList } from './ResourcesList';

export const Resources = observer(() => {
  const workersActions = useQuery({
    queryFn: () => usersService.fetchMany({
      filters: {
        $or: [
          { accountType: { $eq: IAccountTypes.HELPER } },
          { accountType: { $eq: IAccountTypes.FOREMAN } }
        ]
      }
    }),
    queryKey: [QueryType.WORKERS, { accountType: [IAccountTypes.HELPER, IAccountTypes.FOREMAN] }]
    // onSuccess: (data) => data && crewScheduleStore.setWorkers(data),
    //staleTime: Infinity
  });

  const trucksActions = useQuery({
    queryKey: [QueryType.TRUCKS],
    queryFn: trucksService.fetchMany
    // onSuccess: (data) => data?.data && crewScheduleStore.setTrucks(data.data),
    //staleTime: Infinity
  });

  const listsConfig = [
    {
      arr: crewScheduleStore.trucks,
      resourceName: IResources.TRUCKS,
      isLoading: trucksActions.isPending
    },
    {
      arr: crewScheduleStore.workers,
      resourceName: IResources.WORKERS,
      isLoading: workersActions.isPending
    }
  ];

  return (
    <>
      <Typography.Title level={5}>Resources</Typography.Title>
      <Collapse
        accordion
        defaultActiveKey={[IResources.TRUCKS]}
        expandIconPosition="end"
        expandIcon={({ isActive }) => isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
      >
        {listsConfig.map(({ arr, resourceName, isLoading }) => (
          <Collapse.Panel
            header={resourceName}
            key={resourceName}
            extra={renderFilterButton()}
          >
            <ResourcesList key={resourceName} arr={arr} resourceName={resourceName} isLoading={isLoading} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );

  function renderFilterButton() {
    return (
      <Button
        size="small"
        type="link"
        onClick={event => { event.stopPropagation(); }}
      >
        Filters
      </Button>
    );
  }
});

