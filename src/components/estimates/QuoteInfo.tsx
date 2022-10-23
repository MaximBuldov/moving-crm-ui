import React, { FC } from 'react';
import { Card, Form, Input, Select, Tag } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { IJob } from 'models/job';

const { Item } = Form;
const { Option } = Select;

interface QuoteInfoProps {
	data: IJob
}

const QuoteInfo: FC<QuoteInfoProps> = ({ data: { attributes, id } }) => {
  return (
    <Card
      title={<span><InfoCircleOutlined /> Quote Info</span>}
      extra={<Tag color="success">Opportunity</Tag> }
      type="inner"
    >
      <Form
        size="small"
        labelAlign="left" labelCol={{ span: 8 }}
        initialValues={{
          number: id,
          type: 'local',
          source: attributes.customer?.data.attributes.source,
          sales: attributes.manager?.data.id,
          estimator: attributes.manager?.data.id,
          branch: 'San Diego',
          region: 'California',
          tags: ['VIP']
        }}
      >
        <Item style={{ marginBottom: 10 }} label="Number" name="number">
          <Input style={{ color: '#000' }} disabled bordered={false} />
        </Item>
        <Item style={{ marginBottom: 10 }} label="Type" name="type">
          <Select bordered={false}>
            <Option value="local">Local</Option>
            <Option value="interstate">Interstate</Option>
          </Select>
        </Item>
        <Item style={{ marginBottom: 10 }} label="Source" name="source">
          <Select bordered={false}>
            <Option value="google">Google</Option>
            <Option value="yelp">Yelp</Option>
            <Option value="facebook">Facebook</Option>
          </Select>
        </Item>
        <Item style={{ marginBottom: 10 }} label="Sales" name="sales">
          <Input style={{ color: '#000' }} disabled bordered={false} />
        </Item>
        <Item style={{ marginBottom: 10 }} label="Estimator" name="estimator">
          <Select bordered={false}>
            <Option value="Tom">Tom</Option>
            <Option value="Alex">Alex</Option>
            <Option value="Max">Max</Option>
          </Select>
        </Item>
        <Item style={{ marginBottom: 10 }} label="Branch" name="branch">
          <Select bordered={false}>
            <Option value="San Diego">San Diego</Option>
            <Option value="Los Angeles">Los Angeles</Option>
          </Select>
        </Item>
        <Item style={{ marginBottom: 10 }} label="Region" name="region">
          <Select bordered={false}>
            <Option value="California">California</Option>
            <Option value="Utah">Utah</Option>
          </Select>
        </Item>
        <Item style={{ marginBottom: 10 }} label="Tags" name="tags">
          <Select showArrow={true} mode="multiple" bordered={false}>
            <Option value="VIP">VIP</Option>
            <Option value="Piano">Piano</Option>
          </Select>
        </Item>
      </Form>
    </Card>
  );
};

export default QuoteInfo;
