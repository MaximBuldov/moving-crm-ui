import React, { FC, ReactNode } from 'react';
import { Card, Col, Tooltip } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

interface DashboardContainerProps {
	span: number,
	title: string,
	children: ReactNode
}

const DashboardContainer: FC<DashboardContainerProps> = ({ span, title, children }) => {
  const info = 'Combination of estimated and completed revenue of booked moves for the month based on Service Date (does not include taxes or tips).';
  return (
    <Col span={span}>
      <Card extra={<Tooltip title={info}><QuestionCircleTwoTone /></Tooltip> } size="small" title={title} bordered={false}>
        {children}
      </Card>
    </Col>
  );
};

export default DashboardContainer;
