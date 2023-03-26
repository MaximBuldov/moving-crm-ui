import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';

const { Item } = Form;

interface OpportunitiesMessageProps {
	placeholder: string,
	button: string
}

export const OpportunitiesMessage = ({ placeholder, button }: OpportunitiesMessageProps) => {
  const [check, setCheck] = useState(false);
  return (
    <>
      <Item name="message">
        <Input.TextArea bordered={false} placeholder={placeholder} />
      </Item>
      <Row align="middle" justify="space-between">
        <Col>
          <Item noStyle name="follow-up">
            <Checkbox checked={check} onChange={() => setCheck(!check)}>Create a follow-up</Checkbox>
          </Item>
        </Col>
        <Col>
          <Item noStyle>
            <Button type="primary" htmlType="submit">{button}</Button>
          </Item>
        </Col>
      </Row>
    </>
  );
};

