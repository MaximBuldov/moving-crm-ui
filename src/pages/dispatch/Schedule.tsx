import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Col, Row } from 'antd';
import Jobs from 'components/dispatch/Jobs';
import Resources from 'components/dispatch/Resources';
import Timesheet from 'components/dispatch/Timesheet';
import Heading from 'layouts/Heading';
import { private_routes } from 'routes';
import { DISPATCH_ROUTE } from 'routes/consts';

export default function Schedule() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  // const draggableMarkup = (
  //   <Resources id="draggable">Drag me</Resources>
  // );

  function handleDragEnd(event: any) {
    const { over } = event;
    setParent(over ? over.id : null);
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

// {containers.map((id) => (
//   <Timesheet key={id} id={id}>
//     {/* {parent === id ? draggableMarkup : 'Drop here'} */}
//   </Timesheet>
// ))}