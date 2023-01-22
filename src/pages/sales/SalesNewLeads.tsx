import { FC, useState } from 'react';
import { Select, Space } from 'antd';
import Heading from 'layouts/Heading';
import { useQuery } from '@tanstack/react-query';
import jobsService from 'services/collections/jobs.service';
import { fieldsStore } from 'stores';
import { SALES_ROUTE } from 'routes/consts';
import LeadsTable from 'components/sales/leadsTable';
import { JobsStatus } from 'models/fields';
import { fieldNames } from 'stores/fieldsStore';
import { private_routes } from 'routes';

//TODO: Revenue
const SalesMyLeads: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [source, setSource] = useState<string | undefined>();
  const jobsAction = useQuery(['jobs', { page }], () => jobsService.fetchMany({
    filters:  { $and: [
      { jobStatus: { $eq: JobsStatus.NEW_LEAD } },
      { customer: { 
        source: { $eq: source }
      } }
    ] },
    pagination: { page }
  }));

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
        isLoading={jobsAction.isLoading}
        data={jobsAction?.data}
        page={page}
        setPage={(page) => setPage(page)}
      />
    </Space>
  );
};

export default SalesMyLeads;
