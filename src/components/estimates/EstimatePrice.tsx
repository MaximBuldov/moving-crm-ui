import React from 'react';
import { Card, Col, Row, Select, Space } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

const rate = 180;
const time = 8.5;
const subtotal = Math.round((rate * time) + 49);
const payments = 1200;

const data = [
  {
    name: 'Moving Services',
    value: Math.round(rate * time)
  },
  {
    name: 'Materials',
    value: 0
  },
  {
    name: 'Additional Services',
    value: 0
  },
  {
    name: 'Fuel Surcharge',
    value: 49
  },
  {
    name: 'Valuation',
    value: 0
  },
  {
    name: 'Subtotal',
    value: subtotal,
    weight: 'bold'
  },
  {
    name: 'Sales Tax',
    value: 0
  },
  {
    name: 'Estimated Total',
    value: subtotal,
    weight: 'bold'
  },
  {
    name: 'Payments',
    value: payments
  },
  {
    name: 'Balance',
    value: subtotal - payments,
    weight: 'bold'
  }
];

export const EstimatePrice = () => {
  return (
    <Card
      type="inner"
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <div>ESTIMATE TYPE</div>
            <Select bordered={false} size="small" defaultValue="hourly">
              <Select.Option value="hourly">Hourly</Select.Option>
              <Select.Option value="Mileage-Rated">Mileage-Rated</Select.Option>
            </Select>
          </Col>
          <Col>
            <div>BINDING TYPE</div>
            <Select bordered={false} size="small" defaultValue="Non-Binding">
              <Select.Option value="Non-Binding">Non-Binding</Select.Option>
              <Select.Option value="Binding / Flat Rate">Binding / Flat Rate</Select.Option>
            </Select>
          </Col>
          <Col><PlusCircleTwoTone /></Col>
        </Row>
      }
    >
      <Space size="middle" direction="vertical" style={{ width: '100%' }}>
        {
          data.map(({ name, value, weight = 'normal' }) => (
            <Row key={name} style={{ fontWeight: weight }} justify="space-between">
              <Col>{name}</Col>
              <Col>${value}</Col>
            </Row>
          ))
        }
      </Space>
    </Card>
  );
};

