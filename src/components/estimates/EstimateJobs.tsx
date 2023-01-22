import React, { useState } from 'react';
import { Button, Card, Col, DatePicker, Row, Select, Space, Tag, TimePicker, Tooltip } from 'antd';
import {
  CarOutlined,
  CheckOutlined,
  CopyTwoTone,
  DeleteOutlined,
  PlusCircleTwoTone,
  PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const jobsData = [
  {
    id: '324',
    type: 'Scheduled',
    name: 'Moving',
    confirmed: true,
    data: dayjs(),
    time: dayjs(),
    price: 809
  },
  {
    id: '324',
    type: 'Unscheduled',
    name: 'Packing',
    confirmed: false,
    date: dayjs(),
    time: dayjs(),
    price: 401
  }
];

const EstimateJobs = () => {
  const [data, setData] = useState(jobsData);

  const copyCard = (i: number) => {
    setData([...data, data[i]]);
  };
  const deleteCard = (i: number) => {
    //:TODO переделать на filter
    setData(data.filter((_, index) => index === i));
  };
  const cards = data.map((el, i) => (
    <Card key={i} size="small" title={`Job ${el.id}-${i}`} extra={
      <Space>
        <Tooltip title="Duplicate">
          <Button onClick={() => copyCard(i)} size="small" type="primary" ghost icon={<CopyTwoTone />}  />
        </Tooltip>
        <Tooltip title="Delete">
          <Button onClick={() => deleteCard(i)} size="small" danger type="primary" icon={<DeleteOutlined />} />
        </Tooltip>
      </Space>
    }>
      <Row justify="space-between" align="middle">
        <Col>
          <Tag color={el.type === 'Scheduled' ? 'success' : ''}>{el.type}</Tag>
          <Tag color={el.confirmed ? 'success' : ''}><CheckOutlined /></Tag>
          <Select bordered={false} size="small" defaultValue={el.name}>
            <Select.Option value="Moving">Moving</Select.Option>
            <Select.Option value="Packing">Packing</Select.Option>
            <Select.Option value="Load">Load only</Select.Option>
          </Select>
        </Col>
        <Col><DatePicker defaultValue={el.date} size="small" bordered={false}/> / <TimePicker defaultValue={el.time} size="small" bordered={false}/></Col>
        <Col>${el.price}</Col>
      </Row>
    </Card>
  ));

  return (
    <Card type="inner" title={<span><CarOutlined /> Jobs</span>} extra={<PlusCircleTwoTone />}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {cards}
        <Button style={{ margin: 'auto', display: 'table' }} size="small" ghost icon={<PlusOutlined />} type="primary">Add pick-up/delivery spread</Button>
      </Space>

    </Card>
  );
};

export default EstimateJobs;
