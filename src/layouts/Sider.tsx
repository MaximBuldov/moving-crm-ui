import React, { FC, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChartOutlined,
  CalendarOutlined,
  DropboxOutlined,
  PhoneOutlined,
  SettingOutlined,
  TeamOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import {
  CAL_JOBS_ROUTE,
  CUSTOMER_SERVICE_TICKET_ROUTE,
  CUSTOMERS_ROUTE,
  SALES_DASHBOARD_ROUTE, STORAGE_DASHBOARD_ROUTE,
  TASKS_ROUTE,
  SETTINGS_ROUTE
} from 'routes/consts';
import styles from 'layouts/layouts.module.scss';

const items: MenuProps['items'] = [
  {
    label: 	<NavLink to={CAL_JOBS_ROUTE}>Calendar</NavLink>,
    key: CAL_JOBS_ROUTE,
    icon: <CalendarOutlined />
  },
  {
    label: <NavLink to={TASKS_ROUTE}>Tasks</NavLink>,
    key: TASKS_ROUTE,
    icon: <UnorderedListOutlined />
  },
  {
    label: 	<NavLink to={SALES_DASHBOARD_ROUTE}>Sales</NavLink>,
    key: SALES_DASHBOARD_ROUTE,
    icon: <BarChartOutlined />
  },
  {
    label: 	<NavLink to={CUSTOMERS_ROUTE}>Customers</NavLink>,
    key: CUSTOMERS_ROUTE,
    icon: <TeamOutlined />
  },
  {
    label: 	<NavLink to={CUSTOMER_SERVICE_TICKET_ROUTE}>Customer service</NavLink>,
    key: CUSTOMER_SERVICE_TICKET_ROUTE,
    icon: <PhoneOutlined />
  },
  {
    label: 	<NavLink to={STORAGE_DASHBOARD_ROUTE}>Storage</NavLink>,
    key: STORAGE_DASHBOARD_ROUTE,
    icon: <DropboxOutlined />
  },
  {
    label: 	<NavLink to={SETTINGS_ROUTE}>Settings</NavLink>,
    key: SETTINGS_ROUTE,
    icon: <SettingOutlined />
  }
];

const Sider: FC = () => {
  const location = useLocation();
  const [isCollapse, setCollapse] = useState(true);

  return (
    <Layout.Sider
      className={styles['sider']}
      collapsed={isCollapse}
      collapsible
      onCollapse={() => setCollapse(!isCollapse)}
    >
      <Menu items={items} theme="dark" mode="inline" defaultSelectedKeys={['3']} selectedKeys={[location.pathname]} />
    </Layout.Sider>
  );
};

export default Sider;
