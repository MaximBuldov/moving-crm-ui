import React, { FC } from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Emails',
    today: 12,
    week: 73,
    month: 348
  },
  {
    key: '2',
    name: 'Calls',
    today: 9,
    week: 54,
    month: 164
  },
  {
    key: '3',
    name: 'Texts',
    today: 5,
    week: 43,
    month: 158
  },
  {
    key: '4',
    name: 'Quotes Sent',
    today: 10,
    week: 64,
    month: 311
  }
];

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Today',
    dataIndex: 'today',
    key: 'today'
  },
  {
    title: 'Week',
    dataIndex: 'week',
    key: 'week'
  },
  {
    title: 'Month',
    dataIndex: 'month',
    key: 'month'
  }
];

export const DashboardActions: FC = () => {

  return (
    <Table size="middle" dataSource={dataSource} columns={columns} pagination={false} />
  );
};

