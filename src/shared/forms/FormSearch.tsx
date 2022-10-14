import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Space, Table, Tabs, Tag } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <Link to={text}>{text}</Link>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        <Button>Invite {record.name}</Button>
        <Button>Delete</Button>
      </Space>
    )
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

const FormSearch = () => {
  const [isTableVisible, setTableVisible] = useState(false);

  const onMovingSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setTableVisible(true);
    } else {
      setTableVisible(false);
    }
  };

  const tabs = [
    { 
      label: 'Moving',
      key: '1',
      children: <Input onChange={onMovingSearch} placeholder="Enter a job number, phone number, email or partial name" />
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
      {isTableVisible &&(
        <Table pagination={false} columns={columns} dataSource={data}/>
      )}
    </>
  );
};

export default FormSearch;
