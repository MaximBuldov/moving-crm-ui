import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { List, Avatar, Popover, Badge } from 'antd';
import { Link } from 'react-router-dom';
import styles from 'layouts/layouts.module.scss';

const inboxData = [
  {
    title: 'John'
  },
  {
    title: 'Mike'
  },
  {
    title: 'Marry'
  },
  {
    title: 'Max'
  }
];

const inboxContent = (
  <List
    itemLayout="horizontal"
    dataSource={inboxData}
    style={{ width: 400 }}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{item.title[0]}</Avatar>}
          title={<Link to="/">{item.title}</Link>}
          description="Proin eget tortor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
        />
      </List.Item>
    )} />
);

const InboxHeader = () => {
  return (
    <Popover title="Inbox" content={inboxContent} trigger="click" placement="bottomRight">
      <Badge size="small" count={4}>
        <InboxOutlined className={styles['header-icons']} />
      </Badge>
    </Popover>
  );
};

export default InboxHeader;