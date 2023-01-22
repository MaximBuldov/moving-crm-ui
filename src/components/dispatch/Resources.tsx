import React from 'react';
import { CheckCircleTwoTone, MinusSquareOutlined, PlusSquareOutlined, StopTwoTone } from '@ant-design/icons';
import { Button, Col, Collapse, Row, Spin, Tooltip, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import trucksService from 'services/collections/trucks.service';
import { ITruck } from 'models/truck';
import usersService from 'services/collections/users.service';
import { IAccountTypes, IUser, IUserAttributes } from 'models/user';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';

import styles from './dispatch.module.scss';

interface EL {
  id: number,
  name: string,
  used: boolean
}

const CN = 'resources';

export default function Resources() {
  const trucksActions = useQuery(['trucks'], trucksService.fetchMany);
  const workersActions = useQuery(['workers'], () => usersService.fetchMany({
    filters:  { $or: [
      { accountType: { $eq: IAccountTypes.HELPER } },
      { accountType: { $eq: IAccountTypes.FOREMAN } }
    ] }
  }));

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable'
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform)
  } : undefined;

  return (
    <>
      <Typography.Title level={5}>Resources</Typography.Title>
      <Collapse
        accordion
        defaultActiveKey={['trucks']}
        expandIconPosition="end"
        expandIcon={({ isActive }) => isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined /> }
      >
        <Collapse.Panel header="Truks" key="truks" extra={renderFilterButton()}>
          <div ref={setNodeRef}>
            {renderTrucks(trucksActions.data?.data)}
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="Crew members" key="crew" extra={renderFilterButton()}>
          {renderWorker(workersActions?.data)}
        </Collapse.Panel>
      </Collapse>
    </>
  );

  function renderTrucks(arr: ITruck[]) {
    return arr?.length ? arr.map((el: ITruck) => (
      <Row
        key={el.id}
        className={styles[`${CN}__list-el`]}
        style={style}
        {...listeners}
        {...attributes}
      >
        <Col span={2}>{el.attributes.active && <CheckCircleTwoTone />}</Col>
        <Col span={20}>{el.attributes.name}</Col>
        <Col span={2}><Tooltip title="Mark as unavailable"><StopTwoTone /></Tooltip></Col>
      </Row>
    )) : <Spin />;
  }

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