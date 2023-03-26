import React, { FC, ReactNode } from 'react';
import { Avatar, Card, Col, Row, Tooltip } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

interface DashboardCardProps {
	span: number,
	title: string,
	data?: {
		count?: number,
		value?: number
	},
	color: string,
	icon: ReactNode
}

export const DashboardCard: FC<DashboardCardProps> = ({ span, title, data = { count: 42, value: 58421 }, color, icon }) => {
  const info = 'Combination of estimated and completed revenue of booked moves for the month based on Service Date (does not include taxes or tips).';
  return (
    <Col span={span}>
      <Card extra={<Tooltip title={info}><QuestionCircleTwoTone /></Tooltip> } size="small" title={title} bordered={false}>
        <Row gutter={8} align="middle">
          <Col><Avatar shape="square" style={{ backgroundColor: color }} icon={icon} /></Col>
          <Col style={{ color: color, fontSize: 26 }}>
            {data.count && `${data.count} / `}{`$${data.value}`}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
