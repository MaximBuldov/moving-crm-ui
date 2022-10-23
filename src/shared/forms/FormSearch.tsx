import { ChangeEvent } from 'react';
import { Card, Divider, Input, Table, Tabs, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useCustomerSearch from 'hooks/useCustomerSearch';
import { IPhone } from 'models/customer';
import { formattedPhone } from 'utils/formattedPhone';
import { CarOutlined, UserOutlined } from '@ant-design/icons';
import useJobSearchByCustomer from 'hooks/useJobSearchByCustomer';
import moment from 'moment';
import { fieldsStore } from 'stores';
import { JobsStatus } from 'models/fields';
import { ColumnsType } from 'antd/lib/table';

const columnsCustomer = [
  {
    dataIndex: ['attributes', 'name'],
    key: 'name',
    render: (text: string) => <Link to={text}>{text}</Link>
  },
  {
    dataIndex: ['attributes', 'email'],
    key: 'email'
  },
  {
    dataIndex: ['attributes', 'phones'],
    key: 'phones',
    render: (phones: IPhone[]) => formattedPhone(phones[0].phone)
  }
];

const columnsJob = [
  {
    dataIndex: ['attributes', 'customer', 'data', 'attributes', 'name'],
    key: 'name',
    render: (text: string) => <Link to={text}>{text}</Link>
  },
  {
    dataIndex: ['attributes', 'jobStatus'],
    key: 'jobStatus',
    render: (status: JobsStatus) => <Tag color={fieldsStore.getStatusColor(status)}>{status}</Tag>
  },
  {
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => <Link to={id}>{id}</Link>
  },
  {
    dataIndex: ['attributes', 'customer', 'data', 'attributes', 'phones'],
    key: 'phones',
    render: (phones: IPhone[]) => formattedPhone(phones[0].phone)
  },
  {
    dataIndex: ['attributes', 'customer', 'data', 'attributes', 'email'],
    key: 'email'
  },
  {
    dataIndex: ['attributes', 'serviceType'],
    key: 'serviceType'
  },
  {
    dataIndex: ['attributes', 'moveDate'],
    key: 'moveDate',
    render: (date: string) => moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY')
  }
];

const FormSearch = () => {
  const { customersAction, setInput: setCustomersInput } = useCustomerSearch();
  const { jobsAction, setInput: setJobsInput } = useJobSearchByCustomer();

  const onMovingSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 2) {
      setCustomersInput(e.target.value);
      setJobsInput(e.target.value);
    }
  };

  const tabs = [
    { 
      label: 'Moving',
      key: '1',
      children: <Input.Search 
        loading={customersAction.isLoading || jobsAction.isLoading}
        onChange={onMovingSearch}
        placeholder="Enter a job number, phone number, email or partial name"
        size="large"
        enterButton
      />
    },
    { 
      label: 'Storage',
      key: '2',
      children: <Input placeholder="Enter an account number, phone number, email or partial name" />
    }
  ];

  return (
    <>
      <Tabs items={tabs} defaultActiveKey="1" />
      {customersAction?.data?.data && renderTable(customersAction?.data?.data, <><UserOutlined /> Customers</>, columnsCustomer)}
      {jobsAction?.data?.data && renderTable(jobsAction?.data?.data, <><CarOutlined /> Jobs</>, columnsJob)}
    </>
  );

  function renderTable(data: any[], title: any, columns: any) {
    return (
      <Card title={title} type="inner" size="small" >
        <Table
          pagination={false}
          showHeader={false}
          columns={columns}
          dataSource={data}
          rowKey={record => record.id}
          size="small"
        />
      </Card>
    );}
};

export default FormSearch;
