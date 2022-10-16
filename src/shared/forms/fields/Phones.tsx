import React, { Fragment } from 'react';
import { Col, Input, Select, FormListFieldData, FormInstance, Form } from 'antd';
import { fieldsStore } from 'stores';
import { formattedPhones, formatPhoneAction } from 'utils/formattedPhone';

interface PhonesProps {
  fields: FormListFieldData[],
  form: FormInstance
}

function Phones({ form, fields }: PhonesProps) {

  const handlePhone = () => {
    const phones = form.getFieldValue('phones');
    form.setFieldValue('phones', formattedPhones(phones, formatPhoneAction.FORMAT));
  };

  const list = fields.map(({ key, name, ...restField }) => (
    <Fragment key={key}>
      <Col span={8}>
        <Form.Item
          {...restField}
          name={[name, 'phone']}
          label={`Phone ${key + 1}`}
          rules={[{ required: true }]}
        >
          <Input placeholder="Phone" onChange={handlePhone} />
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
    </Fragment>
  ));

  return <>{list}</>;
}

export default Phones;