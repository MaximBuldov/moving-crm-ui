import React from 'react';
import { Col, Form, Input, InputNumber, Row } from 'antd';
import { CarTwoTone, TeamOutlined } from '@ant-design/icons';
import s from 'components/opportunities/opportunities.module.scss';

const { Item } = Form;

const EstimateTeam = () => {
  return (
    <Form
      initialValues={{
        trucks: 2,
        crew: 6,
        rate: 180
      }}
      className={s['opp-box-shadow']}
    >
      <Row wrap={false} align="middle" justify="space-between">
        <Col>
          <Item noStyle name="trucks">
            <InputNumber bordered={false} prefix={<CarTwoTone />} />
          </Item>
        </Col>
        <Col>
          <Item noStyle name="crew">
            <InputNumber bordered={false} prefix={<TeamOutlined style={{ color: '#1890ff' }} />} />
          </Item>
        </Col>
        <Col>8h 30m</Col>
        <Col span={6}>
          <Item noStyle name="rate">
            <Input bordered={false} prefix="$" suffix="/hr"/>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EstimateTeam;
