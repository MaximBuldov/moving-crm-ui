import { useDroppable } from '@dnd-kit/core';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import styles from './dispatch.module.scss';

interface ICrew {
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

export default function Timesheet(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  });
  
  console.log({ isOver, setNodeRef });

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
        {crews.map((crew) => renderCrewLine(crew))}
      </div>
    </>
  );

  function renderCrewLine(crew: ICrew) {
    return (
      <Row ref={setNodeRef} className={styles[`${CN}__crew-line`]} key={crew.id}>
        <Col className={styles[`${CN}__crew-wrap`]} span={5}>
          <div className={styles[`${CN}__crew-name`]}>{crew.name}</div>
          <div className={styles[`${CN}__crew`]}>{props.children}</div>
        </Col>
        <Col className={styles[`${CN}__crew-timeline`]} span={19}></Col>
      </Row>
    );
  }
}