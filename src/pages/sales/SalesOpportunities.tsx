import React, { FC } from 'react';
import { Col, Row, Skeleton, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import OpportunitiesHeading from 'components/opportunities/OpportunitiesHeading';
import OpportunitiesTabs from 'components/opportunities/OpportunitiesTabs';
import OpportunitiesActivity from 'components/opportunities/OpportunitiesActivity';
import OpportunitiesInfo from 'components/opportunities/OpportunitiesInfo';
import jobsService from 'services/api/jobs.service';

type Params = {
	id: any
}

const SalesOpportunities: FC = () => {
  const params = useParams<Params>();
  const jobsAction = useQuery(['jobs', params.id], () => jobsService.fetchOne(params.id));

  return !jobsAction.isLoading ? (
    <Space direction="vertical" style={{ width: '100%' }}>
      <OpportunitiesHeading job={jobsAction.data} />
      <Row gutter={16}>
        <Col span={14}>
          <Space size="middle" direction="vertical" style={{ width: '100%' }}>
            <OpportunitiesTabs />
            <OpportunitiesActivity />
          </Space>
        </Col>
        <Col span={10}>
          <OpportunitiesInfo job={jobsAction.data} />
        </Col>
      </Row>
    </Space>
  ) : (
    <Skeleton active paragraph={{ rows: 15 }} />
  );
};

export default SalesOpportunities;
