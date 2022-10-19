import React, { FC } from 'react';
import { Card, Col, Divider, List, Row, Statistic, Timeline } from 'antd';
import {
  CalendarTwoTone,
  CarOutlined,
  EnvironmentOutlined,
  MailTwoTone,
  MessageTwoTone,
  PhoneTwoTone,
  PlusCircleTwoTone,
  TeamOutlined
} from '@ant-design/icons';
import CustomerContact from 'shared/components/CustomerContact';
import { IJob } from 'models/job';

import s from './opportunities.module.scss'; 
import OpportunitiesMoveForm from './OpportunitiesMoveForm';

//TODO: - estimator count
// 		- truck and crew
//		- price
//		- follow ups

interface OpportunitiesInfoProps {
	job: IJob
}

const CN = 'opportunities-info';

const OpportunitiesInfo: FC<OpportunitiesInfoProps> = ({ job }) => {

  return (
    <div className={s['opp-box-shadow']}>
      <Row gutter={16} align="middle" justify="space-between">
        <Col>
          <CustomerContact data={job.attributes?.customer?.data} />
        </Col>
        <Col span={24}>
          <Row gutter={16} justify="space-between" className={s[`${CN}__touches`]}>
            <Col>
              <Statistic title="call made" value={1} prefix={<PhoneTwoTone />} />
            </Col>
            <Col>
              <Statistic title="texts sent" value={3} prefix={<MessageTwoTone />} />
            </Col>
            <Col>
              <Statistic title="emails sent" value={5} prefix={<MailTwoTone />} />
            </Col>
            <Col>
              <Statistic title="days till move" value={63} prefix={<CalendarTwoTone />} />
            </Col>
          </Row>

        </Col>
      </Row>
      <Divider />
      <OpportunitiesMoveForm job={job} />

      <Divider />
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <Statistic title="Trucks" value={1} prefix={<CarOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Crew" value={3} prefix={<TeamOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Hourly Rate" value={159} prefix="$" />
        </Col>
        <Col span={6}>
          <Statistic title="Type" value="Moving" />
        </Col>
        <Col span={24}>
          <Timeline>
            <Timeline.Item dot={<EnvironmentOutlined />}>
              <Card title="Origin Address" type="inner">
                <div><b>{job.attributes.origin.address}</b></div>
                {job.attributes.origin.propertyType && (
                  <div style={{ color: '#a1a1a1' }}>{job.attributes.origin.propertyType} • {job.attributes.origin.stairs}</div>
                )}
              </Card>
            </Timeline.Item>
            <Timeline.Item dot={<EnvironmentOutlined />}>
              <Card title="Destination Address" type="inner">
                <div><b>{job.attributes.destination.address}</b></div>
                {job.attributes.destination.propertyType && (
                  <div style={{ color: '#a1a1a1' }}>{job.attributes.destination.propertyType} • {job.attributes.destination.stairs}</div>
                )}
              </Card>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
      <Divider />
      {job.attributes.movePrice && (
        <>
          <Row justify="center">
            <Col span={8}>
              <Statistic title="Moving" value={994} prefix="$"/>
            </Col>
            <Col span={8}>
              <Statistic title="Services" value={100} prefix="$"/>
            </Col>
            <Col span={8}>
              <Statistic title="Materials" value={400} prefix="$"/>
            </Col>
          </Row>
          <Divider />
        </>
      )}
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            description: 'Jane',
            title: 'Text John Murray Tomorrow at 08:00 AM (in 12 hours)'
          },
          {
            description: 'Tom',
            title: 'Call John Murray'
          }
        ]}
        header={
          <Row justify="space-between">
            <Col>Follow-ups</Col>
            <Col><PlusCircleTwoTone /></Col>
          </Row>
        }

        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<MessageTwoTone />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OpportunitiesInfo;
