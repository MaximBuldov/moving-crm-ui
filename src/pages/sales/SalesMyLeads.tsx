import { FC, useState } from 'react';
import { Col, Input, Row, Select, Space } from 'antd';
import Heading from 'layouts/Heading';
import userStore from 'stores/userStore';
import { useQuery } from '@tanstack/react-query';
import jobsService from 'services/collections/jobs.service';
import { fieldsStore } from 'stores';
import { SALES_ROUTE } from 'routes/consts';
import LeadsTable from 'components/sales/leadsTable';
import { useDebounce } from 'use-debounce';
import { fieldNames } from 'stores/fieldsStore';
import { private_routes } from 'routes';

//TODO: Revenue
const SalesMyLeads: FC = () => {
  const [managerID, setMangerID] = useState<number | undefined>(userStore.data?.id);
  const [opportunity, setOpportunity] = useState<string | undefined>();
  const [source, setSource] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [customer, setCustomer] = useState<string | undefined>();
  const [debCustomer] = useDebounce(customer, 1000);

  const jobsAction = useQuery(['jobs', { managerID, opportunity, source, debCustomer, page }], () => jobsService.fetchMany({
    filters:  { $and: [
      { manager: { id: { $eq: managerID } } },
      { jobStatus: { $eq: opportunity } },
      { customer: { 
        name: { $contains: debCustomer },
        source: { $eq: source }
      } }
    ] },
    pagination: { page }
  }));

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Heading routes={private_routes} parent={SALES_ROUTE} />
      <Row justify="space-between" align="middle">
        <Col>
          <Select
            onChange={(id: number) => setMangerID(id)}
            defaultValue={userStore.data?.id}
            options={fieldsStore.managers}
            allowClear
            placeholder="Any manager"
          />
          <Select
            placeholder="Any Opp Status"
            options={fieldsStore.jobStatus}
            allowClear
            onChange={(status) => setOpportunity(status)}
          />
          <Select
            placeholder="Any Source"
            options={fieldsStore.data?.source}
            allowClear
            fieldNames={fieldNames}
            onChange={(source) => setSource(source)}
          />
        </Col>
        <Col>
          <Input.Search 
            placeholder="Search leads"
            onSearch={(value) => setCustomer(value)}
            onChange={(event) => setCustomer(event.target.value)}
            allowClear
          />
        </Col>
      </Row>
      <LeadsTable
        isLoading={jobsAction.isLoading}
        data={jobsAction.data}
        page={page}
        setPage={(page) => setPage(page)}
      />
    </Space>
  );
};

export default SalesMyLeads;
