import React from 'react';
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { useDraggable } from '@dnd-kit/core';
import { Col, Row, Tooltip } from 'antd';
import { ITruck } from 'models';
import { CSS } from '@dnd-kit/utilities';

import styles from './dispatch.module.scss';

interface SingleTruckProps {
  truck: ITruck
}

const CN = 'resources';

export function SingleTruck({ truck }: SingleTruckProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: truck.id
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: 2
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      className={styles[`${CN}__list-el`]}
      key={truck.id}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Row>
        <Col span={2}>{truck.attributes.active && <CheckCircleTwoTone />}</Col>
        <Col span={20}>{truck.attributes.name}</Col>
        <Col span={2}><Tooltip title="Mark as unavailable"><StopTwoTone /></Tooltip></Col>
      </Row>
    </div>
    
  );
}