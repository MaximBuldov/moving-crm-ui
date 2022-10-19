import React, { FC } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Tabs, TimePicker } from 'antd';
import { FileTextTwoTone, MailTwoTone, MessageTwoTone, PhoneTwoTone } from '@ant-design/icons';
import moment from 'moment';

import s from './opportunities.module.scss';
import OpportunitiesMessage from './OpportunitiesMessage';

const { Item } = Form;
const { Option } = Select;

const OpportunitiesTabs: FC = () => {
  const disabledHours = () => {
    let arr = [];
    for (let i = 0; i < 25; i++) {
      if (i < 8 || i > 18 ) {
        arr.push(i);
      }
    }
    return arr;
  };

  const items = [
    { 
      label: <span><FileTextTwoTone /> Note</span>,
      key: 'note',
      children: <Form layout="vertical" name="note">
        <OpportunitiesMessage placeholder="Note" button="Add Note" />
      </Form>
    },
    { 
      label: <span><MailTwoTone />Email</span>,
      key: 'email',
      children: <Form name="email">
        <Item
          name="to"
          label="To:"
          style={{ marginBottom: 0 }}
        >
          <Input bordered={false} placeholder="Type an email"/>
        </Item>
        <Item
          name="subject"
          label="Subject:"
        >
          <Input bordered={false} placeholder="Type a subject"/>
        </Item>
        <OpportunitiesMessage placeholder="Type something" button="Send Email" />
      </Form>
    },
    { 
      label: <span><PhoneTwoTone /> Call</span>,
      key: 'call',
      children: <Form name="call">
        <Row justify="space-between">
          <Col>
            <Row>
              <Col>
                <Item>
                  <Select bordered={false} defaultValue="Outbound">
                    <Option value="Inbound">Inbound</Option>
                    <Option value="Outbound">Outbound</Option>
                  </Select>
                </Item>
              </Col>
              <Col>
                <Item>
                  <Select bordered={false} placeholder="Select an outcome">
                    <Option value="No Answer">No Answer</Option>
                    <Option value="Busy">Busy</Option>
                    <Option value="Wrong number">Wrong number</Option>
                    <Option value="Connected">Connected</Option>
                  </Select>
                </Item>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Item>
                  <DatePicker defaultValue={moment()} format="MM/DD/YYYY" bordered={false}/>
                </Item>
              </Col>
              <Col>
                <Item>
                  <TimePicker hideDisabledOptions disabledHours={disabledHours} defaultValue={moment()} format="HH:mm" bordered={false} minuteStep={5}/>
                </Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <OpportunitiesMessage placeholder="Describe the call" button="Log Call" />
      </Form>
    },
    {
      label: <span><MessageTwoTone /> Text</span>,
      key: 'text',
      children: <Form name="text">
        <Item label="To:">
          <Input placeholder="Recipient" bordered={false} />
        </Item>
        <OpportunitiesMessage placeholder="Message" button="Send Text" />
      </Form>
    }
  ];

  return (
    <Tabs className={s['opp-box-shadow']} items={items} size="small" />
  );
};

export default OpportunitiesTabs;
