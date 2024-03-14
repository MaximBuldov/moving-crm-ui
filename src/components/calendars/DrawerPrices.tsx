import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';

interface DrawerPricesProps {
  title: string
}

export const DrawerPrices = ({ title }: DrawerPricesProps) => {
  return (
    <Card title={title} size="small" bordered={false} style={{ backgroundColor: '#fbfbfb' }}>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="2 man crew" value={129} prefix="$" />
        </Col>
        <Col span={6}>
          <Statistic title="3 man crew" value={159} prefix="$" />
        </Col>
        <Col span={6}>
          <Statistic title="4 man crew" value={199} prefix="$" />
        </Col>
        <Col span={6}>
          <Statistic title="Additional crew" value={40} prefix="$" />
        </Col>
      </Row>
    </Card>
  );
};

