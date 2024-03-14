import React, { FC } from 'react';
import { Col, Row, Skeleton, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { OpportunitiesActivity, OpportunitiesHeading, OpportunitiesInfo, OpportunitiesTabs } from 'components';
import { jobsService } from 'services';
import { QueryType } from 'models';

type Params = {
  id: any
}

export const SalesOpportunities: FC = () => {
  const params = useParams<Params>();
  const jobsAction = useQuery({
    queryKey: [QueryType.JOBS, params.id],
    queryFn: () => jobsService.fetchOne(params.id)
  });

  return !jobsAction.isPending ? (
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

