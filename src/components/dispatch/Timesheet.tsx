import React from 'react';
import { Col, Row, Typography } from 'antd';

import { CrewLine } from './CrewLine';
import styles from './dispatch.module.scss';

export interface ICrew {
  id: number,
  name: string
}

const CN = 'timesheet';

const crews: ICrew[] = [
  {
    id: 1,
    name: 'Crew 1'
  },
  {
    id: 2,
    name: 'Crew 2'
  },
  {
    id: 3,
    name: 'Crew 3'
  },
  {
    id: 4,
    name: 'Crew 4'
  }
];

export function Timesheet(props: any) {

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
        {crews.map((crew) => <CrewLine crew={crew} children={props.children} />)}
      </div>
    </>
  );
}