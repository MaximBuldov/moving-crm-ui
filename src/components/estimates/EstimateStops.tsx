import React, { useState } from 'react';
import { Button, Card, Col, Empty, Modal, Row, Table, Tooltip } from 'antd';
import {
  DeleteTwoTone,
  EnvironmentOutlined,
  MenuOutlined,
  PlusCircleTwoTone,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

import EstimateStopsFullMap from './EstimateStopsFullMap';
import EstimateAddAddress from './EstimateAddAddress';

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns = [
  {
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />
  },
  {
    dataIndex: 'address',
    className: 'drag-visible'
  },
  {
    dataIndex: 'info'
  },
  {
    dataIndex: 'actions',
    render: () => <DeleteTwoTone />
  }
];
const data = [
  {
    key: '1',
    address: '606 Third Ave, San Diego, CA 92101',
    info: 'House • 1 flight(s) • Parking Lot',
    index: 1
  },
  {
    key: '2',
    address: '765 Agate St, San Diego, CA 92109',
    info: 'Storage',
    index: 2
  },
  {
    key: '3',
    address: '10330 Reserve Drive, San Diego, CA',
    info: 'House • 2 flight(s) • Parking Lot',
    index: 3
  }
];

const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableBody = SortableContainer((props: any) => <tbody {...props} />);

const EstimateStops = () => {
  const [dataSource, setDataSource] = useState<any>(data);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(
        el => !!el
      );
      setDataSource(newData);
    }
  };
  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = dataSource.findIndex((x: any) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  let ModalComponent;
  switch (modalContent) {
  case 'fullMap':
    ModalComponent = EstimateStopsFullMap;
    break;
  case 'addAddress':
    ModalComponent = EstimateAddAddress;
    break;
  default:
    ModalComponent = Empty;
    break;
  }

  return (
    <Card
      type="inner"
      title={
        <>
          <span><EnvironmentOutlined /> Stops</span>
          <Button type="link" onClick={() => setModalContent('fullMap')}>Map</Button>
        </>
      }
      extra={
        <Row gutter={16}>
          <Col><Tooltip title="Total round trip mileage (port to port), from office back to the office."><b>RT</b> <QuestionCircleOutlined /> 44m / 31.88mi</Tooltip></Col>
          <Col><Tooltip title="From the origin to the destination, including stops."><b>OD</b> <QuestionCircleOutlined /> 11m / 7.26mi</Tooltip></Col>
          <Col><Tooltip title="From office to origin plus estination back to office."><b>Travel</b> <QuestionCircleOutlined /> 33m / 24.62mi</Tooltip></Col>
          <Col><PlusCircleTwoTone onClick={() => setModalContent('addAddress')} /></Col>

        </Row>
      }
    >
      <Table
        showHeader={false}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow
          }
        }}
      />
      <Modal destroyOnClose={true} width={1000} open={!!modalContent} onOk={() => setModalContent(null)} onCancel={() => setModalContent(null)}>
        <ModalComponent addresses={dataSource} />
      </Modal>
    </Card>
  );
};

export default EstimateStops;
