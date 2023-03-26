import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Col, Row } from 'antd';
import classNames from 'classnames';

import { ICrew } from './Timesheet';
import styles from './dispatch.module.scss';

const CN = 'timesheet';

interface CrewLineProps {
  crew: ICrew;
  children: React.ReactNode
}

export function CrewLine({ crew, children }: CrewLineProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: crew.id
  });

  return (
    <div
      ref={setNodeRef}
      className={styles[`${CN}__crew-line`]}
      key={crew.id}
    >
      <Row>
        <Col
          className={classNames(styles[`${CN}__crew-wrap`], {
            [styles[`${CN}__crew-wrap-active`]]: isOver 
          })}
          span={5}
        >
          <div className={styles[`${CN}__crew-name`]}>{crew.name}</div>
          <div className={styles[`${CN}__crew`]}>{children}</div>
        </Col>
        <Col className={styles[`${CN}__crew-timeline`]} span={19}></Col>
      </Row>
    </div>
  );
}
