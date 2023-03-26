import React, { useState } from 'react';
import { Badge, Card, Form, Input, Typography } from 'antd';

const tabList = [
  {
    key: 'internal',
    tab: 'Internal'
  },
  {
    key: 'customer',
    tab: <Badge status="processing" text="Customer" />
  },
  {
    key: 'crew_notes',
    tab: 'Crew notes'
  },
  {
    key: 'crew_feedback',
    tab: 'Crew feedback'
  }
];

const contentList = {
  internal: {
    title: 'Visible to office only',
    value: ''
  },
  customer: {
    title: 'Visible to customer on portal and invoices',
    value: 'This is a basic quote'
  },
  crew_notes: {
    title: 'Visible to crew',
    value: '***most likely I will need one month\'s of storage while I firm up my new address.****'
  },
  crew_feedback: {
    title: 'Entered by crew',
    disabled: true,
    value: ''
  }
};

export const EstimateNotes = () => {
  const [activeTab, setActiveTab] = useState('internal');
  // const [typedStatus, setTypedStatus] = useState('');
  const [form] = Form.useForm();
  const onTabChange = (key) => {
    setActiveTab(key);
    form.setFieldsValue({
      note: contentList[key]?.value
    });
  };
  // let typingTimer
  // const onValuesChange = changedValues => {
  // 	setTypedStatus('Save pending')
  // 	clearTimeout(typingTimer);
  // 	typingTimer = setTimeout(doneTyping(), 5000)
  // }
  // const doneTyping = () => {
  // 	setTypedStatus('Saved!')
  // }
  return (
    <Card
      type="inner"
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={onTabChange}
      //tabBarExtraContent={typedStatus}
    >
      <Typography.Title level={5}>{contentList[activeTab].title}</Typography.Title>
      <Form form={form} name={activeTab}>
        <Form.Item name="note">
          <Input.TextArea
            rows={10} placeholder="Note..."
            disabled={contentList[activeTab]?.disabled}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

