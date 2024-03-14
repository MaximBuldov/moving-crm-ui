import React from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import { crewScheduleStore } from 'stores';
import { observer } from 'mobx-react-lite';

import { CrewLine } from './CrewLine';
import styles from './dispatch.module.scss';

const CN = 'timesheet';

interface TimesheetProps {
  isLoading: boolean;
}

export const Timesheet = observer(({ isLoading }: TimesheetProps) => {
  return (
    <>
      <Row>
        <Col span={5}>
          <Typography.Title level={5}>Templates</Typography.Title>
        </Col>
        <Col className={styles[`${CN}__timeline`]} span={19}>
          <Row justify="space-between">
            <span>8am</span>
            <span>9am</span>
            <span>10am</span>
            <span>11am</span>
            <span>12pm</span>
            <span>1pm</span>
            <span>2pm</span>
            <span>3pm</span>
            <span>4pm</span>
          </Row>
        </Col>
      </Row>
      <div className={styles[`${CN}__container`]}>
        {crewScheduleStore.crews.map((crew) => <CrewLine key={crew.id} crew={crew} />)}
        {isLoading && <div className="spin-container"><Spin /></div>}
      </div>
    </>
  );
});