import React, { FC } from 'react';
import { Avatar, Col, Empty, Row, Typography } from 'antd';
import { ICustomer } from 'models';

interface CustomerContactProps {
	data?: ICustomer | undefined
}

export const CustomerContact: FC<CustomerContactProps> = ({ data }) => {
  const phones = data ? data.attributes.phones?.map(el => (
    <div key={el.id}><a href={`tel:${el.phone}`}>{el.phone}</a> ({el.phoneType})</div>
  )) : <></>;
  return data ? (
    <Row gutter={16} align="middle">
      <Col>
        <Avatar size={100} style={{ backgroundColor: '#1890ff', fontSize: '30px' }}>{data.attributes.name.split(' ').map(x => x[0]).join('').toUpperCase()}</Avatar>
      </Col>
      <Col>
        <Typography.Title level={4}>{data.attributes.name}</Typography.Title>
        {phones}
        <div><a href={`mailto:${data.attributes.email}`}>{data.attributes.email}</a></div>
      </Col>
    </Row>
  ) : <Empty />;
};

