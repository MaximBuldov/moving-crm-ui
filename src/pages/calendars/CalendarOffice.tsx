import React, { useState } from 'react';
import { Badge, Button, Calendar, Col, Drawer, Row, Select, Space } from 'antd';
import { PresetStatusColorType } from 'antd/lib/_util/colors';
import { private_routes } from 'routes';
import { CreateEventForm } from 'components';
import { Heading } from 'layouts';
const { Option } = Select;

export const CalendarOffice = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  function getListData(value: any) {
    let listData;
    switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: '10:00am Virtual Survey' },
        { type: 'success', content: 'This is usual event.' }
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: '10:00am Virtual Survey' },
        { type: 'error', content: 'This is error event.' }
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: '10:00am Virtual Survey' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ];
      break;
    default:
    }
    return listData || [];
  }
  function dateCellRender(value: any) {
    const listData = getListData(value);
    return (
      <div>
        {listData.map(item => (
          <Badge key={item.content} status={item.type as PresetStatusColorType} text={item.content} />
        ))}
      </div>
    );
  }
  const CalendarFilters = ({ value, onChange }: { value: any, onChange: any }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option className="month-item" key={`${index}`}>
          {months[index]}
        </Select.Option>,
      );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <div style={{ padding: 8 }}>
        <Row justify="end" gutter={8}>
          <Col>
            <Select
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={newYear => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              dropdownMatchSelectWidth={false}
              value={String(month)}
              onChange={selectedMonth => {
                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10));
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
          <Col>
            <Select defaultValue="Any user">
              <Option value="Any user">Any user</Option>
              <Option value="Rob">Rob</Option>
              <Option value="John">John</Option>
              <Option value="Bob">Bob</Option>
            </Select>
          </Col>
          <Col>
            <Select defaultValue="Any type">
              <Option value="Any type">Any type</Option>
              <Option value="Rob">Rob</Option>
              <Option value="John">John</Option>
              <Option value="Bob">Bob</Option>
            </Select>
          </Col>
          <Col>
            <Button onClick={() => setOpenDrawer(true)} type="primary">+ Add Event</Button>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Heading routes={private_routes} parent="/calendars"/>
      <Calendar
        dateCellRender={dateCellRender}
        headerRender={CalendarFilters}
      />
      <Drawer title="Create New Event" placement="right" onClose={() => setOpenDrawer(false)} visible={openDrawer}>
        <CreateEventForm />
      </Drawer>
    </Space>
  );
};

