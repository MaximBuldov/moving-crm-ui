import React from 'react';
import { Card, Col, Descriptions, Divider, Empty, Row, Space, Statistic, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CreditCardTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { CustomerContact } from 'shared';

const dataSource = [
  {
    key: '1',
    job_number: '563',
    status: 'In progress',
    date: '03/05/2022',
    job_type: 'Moving',
    move_size: '4 Bedroom House',
    estimate_amount: '1242.45',
    invoice_amount: '0',
    total_payments: '100',
    balance: '-100'
  }
];

const columns = [
  {
    title: 'Job number',
    dataIndex: 'job_number',
    key: 'job_number',
    render: (text: any) => <Link to="/sales/opportunities/32432542">{text}</Link>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: any) => <Tag color="success">{text}</Tag>
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Job type',
    dataIndex: 'job_type',
    key: 'job_type'
  },
  {
    title: 'Move size',
    dataIndex: 'move_size',
    key: 'move_size'
  },
  {
    title: 'Estimate amount',
    dataIndex: 'estimate_amount',
    key: 'estimate_amount',
    render: (text: any) => `$${text}`
  },
  {
    title: 'Invoice amount',
    dataIndex: 'invoice_amount',
    key: 'invoice_amount',
    render: (text: any) => `$${text}`
  },
  {
    title: 'Total payments',
    dataIndex: 'total_payments',
    key: 'total_payments',
    render: (text: any) => `$${text}`
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    render: (text: any) => `$${text}`
  }
];

export const CustomerDetails = () => {
  return (
    <Space size="large" direction="vertical" style={{ width:'100%' }}>
      <div className="opp-box-shadow">
        <Row align="middle" justify="space-between">
          <Col>
            <CustomerContact />
          </Col>
          <Col>
            <Statistic title="Outstanding Balance" value={300} prefix="$" />
          </Col>
        </Row>
        <Divider />
        <Row justify="space-around" gutter={30}>
          <Col>
            <Statistic title="Address" value="2630 W Madison Cir, Anaheim, CA 92801" />
          </Col>
          <Col>
            <Statistic title="Upcoming Move" value="Monday, 28th March 2022" />
          </Col>
          <Col>
            <Statistic title="Lead Source" value="Yelp" />
          </Col>
        </Row>
      </div>
      <Card title="Jobs">
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      </Card>
      <Card title="Storage Accounts">
        <Empty />
      </Card>
      <Card title="Customer Support">
        <Empty />
      </Card>
      <Card title="Saved Payment Methods">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              type="inner"
              title={
                <Row align="middle" gutter={16}>
                  <Col>
                    <CreditCardTwoTone style={{ fontSize: 30 }} />
                  </Col>
                  <Col>
                    <div><b>Master Card Ending 1234</b></div>
                    <div>via Anywhere Commerce 324321421</div>
                  </Col>
                </Row>
              }
              extra={<DeleteTwoTone />}
            >
              <Descriptions size="small">
                <Descriptions.Item span={24} label="Expiration Date">Aug 2022</Descriptions.Item>
                <Descriptions.Item span={24} label="Postal Code">92000</Descriptions.Item>
                <Descriptions.Item span={24} label="Branches">San Diego</Descriptions.Item>
                <Descriptions.Item span={24} label="Warehouses">San Diego, TEMECULA, OCEANSIDE</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              type="inner"
              title={
                <Row align="middle" gutter={16}>
                  <Col>
                    <CreditCardTwoTone style={{ fontSize: 30 }} />
                  </Col>
                  <Col>
                    <div><b>Master Card Ending 2222</b></div>
                    <div>via Anywhere Commerce 21312321</div>
                  </Col>
                </Row>
              }
              extra={<DeleteTwoTone />}
            >
              <Descriptions size="small">
                <Descriptions.Item span={24} label="Expiration Date">Aug 2022</Descriptions.Item>
                <Descriptions.Item span={24} label="Postal Code">92000</Descriptions.Item>
                <Descriptions.Item span={24} label="Branches">San Diego</Descriptions.Item>
                <Descriptions.Item span={24} label="Warehouses">San Diego, TEMECULA, OCEANSIDE</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </Space>

  );
};

