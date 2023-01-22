import React, { FC } from 'react';
import { Button, Card, Col, Dropdown, Empty, Menu, Row, Skeleton, Space } from 'antd';
import {
  CalendarOutlined,
  CaretDownOutlined,
  ClockCircleOutlined,
  CodeSandboxOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import jobsService from 'services/collections/jobs.service';
import CustomerContact from 'shared/components/CustomerContact';
import QuoteInfo from 'components/estimates/QuoteInfo';
import EstimateJobs from 'components/estimates/EstimateJobs';
import EstimateStops from 'components/estimates/EstimateStops';
import EstimateNotes from 'components/estimates/EstimateNotes';
import EstimatesRecalculate from 'components/estimates/EstimatesRecalculate';
import EstimatesWorkload from 'components/estimates/EstimatesWorkload';
import EstimateTeam from 'components/estimates/EstimateTeam';
import EstimatePrice from 'components/estimates/EstimatePrice';
import s from 'components/opportunities/opportunities.module.scss';

type Params = {
	id: any
}

const EstimatesEdit: FC = () => {
  const params = useParams<Params>();
  const { data, isSuccess, isLoading } = useQuery(['job'], () => jobsService.fetchOne(params.id));

  return isSuccess ? (
    <Space direction="vertical" style={{ width:'100%' }}>
      <div className={s['opp-box-shadow']}>
        <Row align="middle" justify="space-between">
          <Col>
            <CustomerContact data={data?.attributes.customer?.data} />
          </Col>
          <Col>
            <Row gutter={16}>
              <Col>
                <Button type="primary" ghost size="large" icon={<InfoCircleOutlined />}>Activity</Button>
              </Col>
              <Col>
                <Button type="primary" ghost size="large" icon={<ClockCircleOutlined />}>Previous Versions</Button>
              </Col>
              <Col>
                <Button type="primary" ghost size="large" icon={<FileTextOutlined />}>Documents</Button>
              </Col>
              <Col>
                <Dropdown.Button
                  size="large"
                  type="primary"
                  icon={<CaretDownOutlined />}
                  overlay={
                    <Menu>
                      <Menu.Item>Take Payment</Menu.Item>
                      <Menu.Item>Mark Lost</Menu.Item>
                      <Menu.Item>Preview Estimate</Menu.Item>
                      <Menu.Item>Send Estimate</Menu.Item>
                      <Menu.Item>Duplicate Opportunity</Menu.Item>
                    </Menu>
                  }
                >
                  <PlusOutlined /> Book
                </Dropdown.Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row gutter={24}>
        <Col span={5}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <QuoteInfo data={data} />
            <Card type="inner" title={<span><UnorderedListOutlined /> Tasks</span>} extra={<PlusCircleTwoTone />}>
              <Empty />
            </Card>
            <Card type="inner" title={<span><CalendarOutlined /> Estimates/Deliveries</span>} extra={<PlusCircleTwoTone />}>
              <Empty />
            </Card>
            <Card type="inner" title={<span><CodeSandboxOutlined /> Estimated Storage</span>} extra={<PlusCircleTwoTone />}>
              <Empty />
            </Card>
          </Space>

        </Col>
        <Col span={12}>
          <Space size="large" direction="vertical" style={{ width: '100%' } } >
            <EstimateJobs />
            <EstimateStops />
            <EstimateNotes />
          </Space>

        </Col>
        <Col span={7}>
          <Space size="large" direction="vertical" style={{ width: '100%' } }>
            <EstimatesRecalculate />
            <EstimatesWorkload />
            <EstimateTeam />
            <EstimatePrice />
          </Space>
        </Col>
      </Row>
    </Space>
  ) : (
    <>
      {isLoading ? <Skeleton active paragraph={{ rows: 15 }} /> : <Empty />}
    </>
  );
};

export default EstimatesEdit;
