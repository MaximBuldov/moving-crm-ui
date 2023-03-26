import React from 'react';
import { Col, Input, Select, FormListFieldData, FormInstance, Form, Row, Button, FormListOperation } from 'antd';
import { fieldsStore } from 'stores';
import { formattedPhone } from 'utils';
import { PlusCircleTwoTone, DeleteOutlined } from '@ant-design/icons';

interface PhonesProps {
  fields: FormListFieldData[],
  form: FormInstance,
  actions: FormListOperation
}

export function Phones({ fields, actions }: PhonesProps) {

  const { add, remove } = actions;

  const list = fields.map(({ key, name, ...restField }) => (
    <Row gutter={16} key={key} align="bottom" justify="space-between">
      <Col span={12}>
        <Form.Item
          {...restField}
          name={[name, 'phone']}
          label={`Phone ${key + 1}`}
          rules={[{ required: true }]}
          normalize={(val: string) => formattedPhone(val)}
        >
          <Input placeholder="Phone" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          {...restField}
          label={`Phone ${key + 1} Type`}
          name={[name, 'phoneType']}
        >
          <Select placeholder={'Phone Type'} options={fieldsStore.phoneType}/>
        </Form.Item>
      </Col>
      <Col>
        <Form.Item>
          {key === 0 ? (
            <Button onClick={() => add()} icon={<PlusCircleTwoTone />} type="link" />
          ) : (
            <Button onClick={() => remove(name)} icon={<DeleteOutlined />} danger type="link" />
          )}
        </Form.Item>
      </Col>
    </Row>
  ));

  return <>{list}</>;
}

