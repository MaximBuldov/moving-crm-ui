import { FC, useState } from 'react';
import { Select, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { LeadsTable } from 'components';
import { Heading } from 'layouts';
import { JobsStatus, QueryType } from 'models';
import { private_routes, SALES_ROUTE } from 'routes';
import { jobsService } from 'services';
import { fieldsStore, fieldNames } from 'stores';

//TODO: Revenue
export const SalesNewLeads: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [source, setSource] = useState<string | undefined>();
  const jobsAction = useQuery({
    queryKey: [QueryType.JOBS, { page }],
    queryFn: () => jobsService.fetchMany({
      filters: {
        $and: [
          { jobStatus: { $eq: JobsStatus.NEW_LEAD } },
          {
            customer: {
              source: { $eq: source }
            }
          }
        ]
      },
      pagination: { page }
    })
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Heading routes={private_routes} parent={SALES_ROUTE} />
      <Select
        placeholder="Any Source"
        options={fieldsStore.data?.source}
        fieldNames={fieldNames}
        allowClear
        onChange={(source) => setSource(source)}
      />
      <LeadsTable
        isLoading={jobsAction.isPending}
        data={jobsAction?.data}
        page={page}
        setPage={(page) => setPage(page)}
      />
    </Space>
  );
};

