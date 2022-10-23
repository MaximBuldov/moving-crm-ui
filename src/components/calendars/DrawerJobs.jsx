import React from 'react';
import { Card, Divider, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreTwoTone, CarTwoTone, HomeTwoTone, LinkOutlined, SmileTwoTone } from '@ant-design/icons';

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
        <Card style={{ backgroundColor: '#fff' }} size="small" title={<Link to="/">812 - Moving <LinkOutlined /></Link>} extra="8am - 10am">
          <div><SmileTwoTone /> Jennifer Emanuel</div>
          <div><HomeTwoTone /> 3 Bedroom House</div>
          <div><AppstoreTwoTone /> 3168cf / 22176lb</div>
          <div><CarTwoTone /> 92014</div>
        </Card>
        <Card style={{ backgroundColor: '#fff' }} size="small" title={<Link to="/">914 - Packing <LinkOutlined /></Link>} extra="8am - 10am">
          <div><SmileTwoTone /> Jennifer Emanuel</div>
          <div><HomeTwoTone /> 3 Bedroom House</div>
          <div><AppstoreTwoTone /> 3168cf / 22176lb</div>
          <div><CarTwoTone /> 92014</div>
        </Card>
        <Card style={{ backgroundColor: '#fff' }} size="small" title={<Link to="/">714 - Moving <LinkOutlined /></Link>} extra="8am - 10am">
          <div><SmileTwoTone /> Jennifer Emanuel</div>
          <div><HomeTwoTone /> 3 Bedroom House</div>
          <div><AppstoreTwoTone /> 3168cf / 22176lb</div>
          <div><CarTwoTone /> 92014</div>
        </Card>
      </Space>
    </div>
  );
};

export default DrawerJobs;
