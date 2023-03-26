import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { Col, Row } from 'antd';
import { Heading } from 'layouts';
import { private_routes, DISPATCH_ROUTE } from 'routes';
import { Resources, Timesheet, Jobs } from 'components';

export function Schedule() {
  function handleDragEnd(event: any) {
    const { over } = event;
    console.log(over);
    //setParent(over ? over.id : null);
  }

  return (
    <>
      <Heading routes={private_routes} parent={DISPATCH_ROUTE} />
      <div style={{ paddingTop: 24 }}>
        <DndContext onDragEnd={handleDragEnd}>
          <Row gutter={24}>
            <Col span={4}>
              <Resources />
            </Col>
            <Col span={16}>
              <Timesheet />
            </Col>
            <Col span={4}>
              <Jobs />
            </Col>
          </Row>
        </DndContext>
      </div>
    </>
  );
}
