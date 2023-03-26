import React from 'react';
import { CheckCircleTwoTone, MinusSquareOutlined, PlusSquareOutlined, StopTwoTone } from '@ant-design/icons';
import { Button, Col, Collapse, Row, Spin, Tooltip, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { QueryType, IAccountTypes, ITruck, IUserAttributes } from 'models';
import { trucksService, usersService } from 'services';

import styles from './dispatch.module.scss';
import { SingleTruck } from './SingleTruck';

const CN = 'resources';

export function Resources() {
  const trucksActions = useQuery([QueryType.TRUCKS], trucksService.fetchMany);
  const workersActions = useQuery([QueryType.WORKERS], () => usersService.fetchMany({
    filters:  { $or: [
      { accountType: { $eq: IAccountTypes.HELPER } },
      { accountType: { $eq: IAccountTypes.FOREMAN } }
    ] }
  }));

  return (
    <>
      <Typography.Title level={5}>Resources</Typography.Title>
      <Collapse
        accordion
        defaultActiveKey={['trucks']}
        expandIconPosition="end"
        expandIcon={({ isActive }) => isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined /> }
      >
        <Collapse.Panel
          header="Truks"
          key="truks"
          extra={renderFilterButton()}
        >
          {trucksActions.data?.data.length 
            ? trucksActions.data?.data.map((el: ITruck) => <SingleTruck truck={el}/>)
            : <Spin />
          }
        </Collapse.Panel>
        <Collapse.Panel header="Crew members" key="crew" extra={renderFilterButton()}>
          {renderWorker(workersActions?.data)}
        </Collapse.Panel>
      </Collapse>
    </>
  );

  function renderWorker(arr: IUserAttributes[]) {
    return arr?.length ? arr.map((el: IUserAttributes) => (
      <Row key={el.id} className={styles[`${CN}__list-el`]}>
        <Col span={2}>{el.blocked && <CheckCircleTwoTone />}</Col>
        <Col span={20}>{el.fullName}</Col>
        <Col span={2}><Tooltip title="Mark as unavailable"><StopTwoTone /></Tooltip></Col>
      </Row>
    )) : <Spin />;
  }

  function renderFilterButton() {
    return (
      <Button
        size="small"
        type="link"
        onClick={event => { event.stopPropagation(); }}
      >
        Filters
      </Button>
    );
  }
}