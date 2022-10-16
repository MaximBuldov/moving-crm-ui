import React, { Fragment } from 'react';
import { Col, Input, Select, FormListFieldData, FormInstance, Form, Row, Button, FormListOperation } from 'antd';
import { fieldsStore } from 'stores';
import { formattedPhones, formatPhoneAction } from 'utils/formattedPhone';
import { PlusCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
import { remove } from 'mobx';

interface PhonesProps {
  fields: FormListFieldData[],
  form: FormInstance,
  actions: FormListOperation
}

function Phones({ form, fields, actions }: PhonesProps) {

  const { add, remove } = actions;

  const handlePhone = () => {
    const phones = form.getFieldValue('phones');
    form.setFieldValue('phones', formattedPhones(phones, formatPhoneAction.FORMAT));
  };

  const list = fields.map(({ key, name, ...restField }) => (
    <Row gutter={16} key={key} align="bottom" justify="space-between">
      <Col span={12}>
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

export default Phones;

// {(fields, { add, remove }) => (
//   <>
//     {fields.map(({ key, name, ...restField }) => (
//       <Row gutter={16} key={key} align="bottom" justify="space-between">
//         <Col span={12}>
//           <Item
//             {...restField}
//             name={[name, 'phone']}
//             label="Phone Number"
//           >
//             <MaskedInput mask="(111) 111-1111" />
//           </Item>
//         </Col>
//         <Col span={8}>
//           <Item
//             label={'Phone Type'}
//             name={[name, 'phoneType']}
//             {...restField}
//           >
//             {/* <Select placeholder="Phone Type" options={PHONE_TYPE} /> */}
//           </Item>
//         </Col>

//       </Row>
//     ))}
//   </>
// )}