import React, { FC } from 'react';
import { Card, Menu, Timeline } from 'antd';
import { EditOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Item } = Timeline;

const activityMenuItems = [
  { label: 'All', key: 'All' },
  { label: 'Notes', key: 'Notes' },
  { label: 'Emails', key: 'Emails' },
  { label: 'Calls', key: 'Calls' },
  { label: 'Texts', key: 'Texts' }
];

export const OpportunitiesActivity: FC = () => {
  return (
    <Card
      title="Activity"
      extra={
        <Menu items={activityMenuItems} mode="horizontal" defaultSelectedKeys={['All']} />
      }
    >
      <Timeline>
        <Item dot={<FileTextOutlined />} style={{ fontSize: '20px' }}>
          <Card
            type="inner"
            title="Status changed to Lead In Progress from New Lead."
            extra="Feb 14, 2022 at 12:00 by Jane"
            bodyStyle={{ padding: 0 }}
          />
        </Item>
        <Item dot={<PhoneOutlined />} color="red"  style={{ fontSize: '20px' }}>
          <Card
            type="inner"
            extra="Feb 25, 2022 at 11:00 by Jane"
            title="You left a note"
          >
						700 sq ft
						stairs + el
						walking distance ok
						sofa, 2 beds, tv mounted(needs to be unmounted), table+chairs
						parking ok (need to tell the HOA)
						packing (some p.)
          </Card>
        </Item>
        <Item dot={<PlusCircleOutlined />} color="green"  style={{ fontSize: '20px' }}>
          <Card
            type="inner"
            title="You left a note"
            extra="Feb 24, 2022 at 11:00 by Jane"
          >
						Tom: $7800-9500 flat rate
          </Card>
        </Item>
        <Item dot={<EditOutlined />} color="orange"  style={{ fontSize: '20px' }}>
          <Card
            type="inner"
            title="John Murray was created."
            extra="Feb 23, 2022 at 14:23 by Jane"
            bodyStyle={{ padding: 0 }}
          />
        </Item>
        <Item dot={<MailOutlined />} color="purple"  style={{ fontSize: '20px' }}>
          <Card
            type="inner"
            title="You received a call from"
            extra="Feb 21, 2022 at 9:40 by Jane"
          >
						called and spoke to Jane
          </Card>
        </Item>
      </Timeline>
    </Card>
  );
};

