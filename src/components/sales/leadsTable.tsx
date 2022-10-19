import { Key, useState } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { IJob } from 'models/job';
import { fieldsStore } from 'stores';
import { CUSTOMERS_DETAILS_ROUTE, SALES_OPPORTUNITIES_ROUTE } from 'routes/consts';
import { IStrapiMeta } from 'models/response';
import { IManager } from 'models/user';

const columns: ColumnsType<IJob> = [
  {
    title: '#',
    dataIndex: 'id',
    render: id => <Link to={`${SALES_OPPORTUNITIES_ROUTE}/${id}`}>{id} <LinkOutlined /></Link>
  },
  {
    title: 'OPP Status',
    dataIndex: ['attributes', 'jobStatus'],
    render: text => {
      const color = fieldsStore.getStatusColor(text);
      return <Tag color={color}>{text}</Tag>;
    },
    sorter: (a, b) => a.attributes.jobStatus.length - b.attributes.jobStatus.length
  },
  {
    title: 'Name',
    dataIndex: ['attributes', 'customer', 'data'],
    render: customer => <Link to={`${CUSTOMERS_DETAILS_ROUTE}/${customer?.id}`}>{customer?.attributes?.name}</Link>
  },
  {
    title: 'Type',
    dataIndex: ['attributes', 'serviceType']
  },
  {
    title: 'Move size',
    dataIndex: ['attributes', 'moveSize']
  },
  {
    title: 'Service date',
    dataIndex: ['attributes', 'moveDate'],
    render: date => moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY'),
    sorter: (a, b) => a.attributes.jobStatus.length - b.attributes.jobStatus.length
  },
  {
    title: 'Est. Revenue',
    dataIndex: 'estRevenue',
    render: text => '?',
    sorter: (a, b) => a.attributes.jobStatus.length - b.attributes.jobStatus.length
  },
  {
    title: 'Origin',
    dataIndex: ['attributes', 'origin', 'address']
  },
  {
    title: 'Destination',
    dataIndex: ['attributes', 'destination', 'address']
  },
  {
    title: 'Messages',
    dataIndex: 'messages'
  },
  {
    title: 'Create date',
    dataIndex: ['attributes', 'createdAt'],
    render: date => moment(date).format('MM/DD/YYYY')
  },
  {
    title: 'Last contact',
    dataIndex: ['attributes', 'updatedAt'],
    render: date => moment(date).fromNow(true)
  },
  {
    title: 'Source',
    dataIndex: ['attributes', 'customer', 'data', 'attributes', 'source']
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    sorter: (a, b) => a.attributes.jobStatus.length - b.attributes.jobStatus.length,
    render: () => 'San Diego'
  },
  {
    title: 'Assigned to',
    dataIndex: ['attributes', 'manager', 'data', 'attributes', 'fullName']
  }
];

interface SalesMyLeadsProps {
  isLoading: boolean,
  data?: {
    data: IJob[],
    meta: IStrapiMeta
  },
  page: number,
  setPage: (page: number) => void
}

//TODO: Revenue
const LeadsTable = ({ isLoading, data, page, setPage }: SalesMyLeadsProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => setSelectedRowKeys(selectedRowKeys)
  };
  return (
    <Table
      loading={isLoading}
      size="middle"
      rowSelection={rowSelection}
      dataSource={data?.data}
      columns={columns}
      scroll={{ x: 2200 }}
      rowKey={record => record.id}
      pagination={{
        current: page,
        onChange: (page) => setPage(page),
        pageSize: 25,
        total: data?.meta.pagination.total
      }}
    />
  );
};

export default LeadsTable;
