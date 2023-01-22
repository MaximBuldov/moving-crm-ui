import React from 'react';
import { Card, Divider, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreTwoTone, CarTwoTone, HomeTwoTone, LinkOutlined, SmileTwoTone } from '@ant-design/icons';
import JobCard from 'shared/components/JobCard';

const { Option } = Select;
const DrawerJobs = () => {
  return (
    <div>
      <Divider orientation="left">3 jobs</Divider>
      <div style={{ marginLeft: 'auto', display: 'table' }}>
        <Select defaultValue="All Job Types" bordered={false}>
          <Option value="All Job Types">All Job Types</Option>
          <Option value="Moving">Moving</Option>
          <Option value="Packing">Packing</Option>
        </Select>
        <Select defaultValue="All Distances" bordered={false}>
          <Option value="All Distances">All Distances</Option>
          <Option value="Local">Local</Option>
          <Option value="Interstate">Interstate</Option>
        </Select>
        <Select defaultValue="Booked" bordered={false}>
          <Option value="Booked">Booked</Option>
          <Option value="Opportunity">Opportunity</Option>
          <Option value="End Date">End Date</Option>
        </Select>
      </div>
      <Space style={{ width: '100%' }} direction="vertical">
        <JobCard />
        <JobCard />
        <JobCard />
      </Space>
    </div>
  );
};

export default DrawerJobs;
