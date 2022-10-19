import React, { FC } from 'react';
import { Col, Row, Statistic } from 'antd';
import {
  BellTwoTone,
  CalendarTwoTone, DatabaseTwoTone,
  ExclamationCircleTwoTone,
  MessageTwoTone,
  WarningTwoTone
} from '@ant-design/icons';

const OpenItems: FC = () => {
  return (
    <Row gutter={[8,24]}>
      <Col span={12}>
        <Statistic title="New leads" value={1} prefix={<ExclamationCircleTwoTone />} />
      </Col>
      <Col span={12}>
        <Statistic title="Follow-ups" value={39} prefix={<BellTwoTone />} />
      </Col>
      <Col span={12}>
        <Statistic title="Unread Messages" value={4} prefix={<MessageTwoTone />} />
      </Col>
      <Col span={12}>
        <Statistic title="Stale Opportunities" value={14} prefix={<WarningTwoTone />} />
      </Col>
      <Col span={12}>
        <Statistic title="Accepted" value={0} prefix={<CalendarTwoTone />} />
      </Col>
      <Col span={12}>
        <Statistic title="Inventory Submissions" value={114} prefix={<DatabaseTwoTone />} />
      </Col>
    </Row>
  );
};

export default OpenItems;
