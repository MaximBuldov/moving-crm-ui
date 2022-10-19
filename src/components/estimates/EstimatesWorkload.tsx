import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import s from 'components/opportunities/opportunities.module.scss';
const { Option } = Select;
const { Item } = Form;

const apSize = ['Studio', '1 bedroom', '2 bedroom', '3 bedroom'];
const apAdRooms = ['Patio', 'Garage', 'Office', 'Living Room'];

const options = (arr: string[]) => arr.map(el => <Option key={el} value={el}>{el}</Option>);

const EstimatesWorkload = () => {

  return (
    <Form
      className={s['opp-box-shadow']}
      initialValues={{
        apSize: '2 bedroom',
        cuft: '1600',
        lb: '11200'
      }}
    >
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col span={10}>
          <Item noStyle name="apSize">
            <Select size="large" bordered={false}>
              {options(apSize)}
            </Select>
          </Item>
          <Item style={{ marginBottom: 0 }} name="apAdRooms">
            <Select mode="multiple" placeholder="Add additional rooms">
              {options(apAdRooms)}
            </Select>
          </Item>
        </Col>
        <Col span={14}>
          <Row gutter={16}>
            <Col span={12}>
              <Item noStyle name="cuft">
                <Input style={{ borderBottom: '1px dashed #1890ff' }} bordered={false} suffix="CuFT" />
              </Item>
            </Col>
            <Col span={12}>
              <Item noStyle name="lb">
                <Input style={{ borderBottom: '1px dashed #1890ff' }} bordered={false} suffix="lb" />
              </Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>

  );
};

export default EstimatesWorkload;
