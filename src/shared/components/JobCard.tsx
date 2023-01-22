import { LinkOutlined, SmileTwoTone, HomeTwoTone, AppstoreTwoTone, CarTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard() {
  return (
    <Card style={{ backgroundColor: '#fff', marginBottom: 10 }} size="small" title={<Link to="/">812 - Moving <LinkOutlined /></Link>} extra="8am - 10am">
      <div><SmileTwoTone /> Jennifer Emanuel</div>
      <div><HomeTwoTone /> 3 Bedroom House</div>
      <div><AppstoreTwoTone /> 3168cf / 22176lb</div>
      <div><CarTwoTone /> 92014</div>
    </Card>
  );
}
