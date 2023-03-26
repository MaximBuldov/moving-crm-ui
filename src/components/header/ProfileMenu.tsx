import React from 'react';
import { Popover, Badge, Avatar, Row, Col, Menu, MenuProps } from 'antd';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';
import { userStore } from 'stores';
import styles from 'layouts/layouts.module.scss';
import { BankOutlined, CompassOutlined, DollarCircleOutlined, LogoutOutlined, MessageOutlined, ReadOutlined, RocketOutlined, UserOutlined } from '@ant-design/icons';

const CN = 'profile-menu';

export function ProfileMenu() {
  const items: MenuProps['items'] = [
    { label: 'My account', key: 'account', icon: <UserOutlined /> },
    { label: 'Billing Information', key: 'billing', icon: <DollarCircleOutlined /> },
    { label: 'Updates', key: 'updates', icon: <RocketOutlined /> },
    { label: 'Product Roadmap', key: 'roadmap', icon: <CompassOutlined /> },
    { label: 'Academy', key: 'academy', icon: <BankOutlined /> },
    { label: 'Help Center', key: 'help', icon: <ReadOutlined /> },
    { label: 'Get Support', key: 'support', icon: <MessageOutlined /> },
    { label: 'Logout', key: 'logout', icon: <LogoutOutlined />, onClick: () => userStore.logout() }
  ];

  return (
    <Popover content={renderMenu()} title={renderAvatarWithContact()} trigger="click" placement="bottomRight">
      <Badge count={1}>
        {renderAvatar('default')}
      </Badge>
    </Popover>
  );

  function renderAvatar(size: AvatarSize) {
    return (
      <Avatar 
        size={size}
        className={styles[`${CN}__user-avatar`]}
      >
        {userStore.initials}
      </Avatar>
    );
  }

  function renderAvatarWithContact() {
    return (
      <Row gutter={16} align="middle" className={styles[`${CN}__user-contact`]}>
        <Col>{renderAvatar('large')}</Col>
        <Col>
          <div>{userStore.data?.fullName}</div>
          <div>{userStore.data?.email}</div>
        </Col>
      </Row>
    );
  }

  function renderMenu() {
    return <Menu className={styles[CN]} items={items} />;
  }
}
